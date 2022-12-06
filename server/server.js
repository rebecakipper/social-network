require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("./bcrypt");
const compression = require("compression");
const path = require("path");
const db = require("./db");
const { ensureSignedOut, uploader, cookieSession } = require("./middlewares");
const { upload } = require("./s3");
const { SOCKET_REQ_HEADER } = process.env;
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith(SOCKET_REQ_HEADER)),
});

app.use(express.json());

app.use(compression());

app.use(cookieSession);

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(require("cors")());

io.use((socket, next) => {
    cookieSession(socket.request, socket.request.res, next);
});

io.on("connection", async (socket) => {
    const { userId } = socket.request.session;
    if (!userId) {
        return socket.disconnect(true);
    }
    const latestMessages = await db.getLastMessages();

    socket.emit("chatMessages", latestMessages);

    socket.on("chatMessage", async (text) => {
        const insertedMessage = await db.insertMessage(userId, text);

        const { first_name, last_name, profile_picture_url } =
            await db.getUserData(userId);
        const messageObj = {
            ...insertedMessage,
            first_name,
            last_name,
            profile_picture_url,
        };

        return io.emit("chatMessage", messageObj);
    });
});

app.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

app.post("/register.json", ensureSignedOut, (req, res) => {
    const { first_name, last_name, email, user_password } = req.body;

    bcrypt.hash(user_password).then((hashed_password) => {
        db.createUser(first_name, last_name, email, hashed_password)
            .then((id) => {
                req.session.userId = id;
                return res.json({ success: true });
            })
            .catch((error) => {
                console.log("error registering user", error);
                return res.json({ success: false });
            });
    });
});

app.post("/login.json", ensureSignedOut, (req, res) => {
    const { email, user_password } = req.body;

    db.getUserByEmail(email)
        .then(([hashed_password, id]) => {
            const uId = id;
            bcrypt
                .authenticate(user_password, hashed_password)
                .then((result) => {
                    if (result === true) {
                        req.session.userId = uId;
                        return res.json({ success: true });
                    } else {
                        console.log("error loging in user");
                        return res.json({ success: false });
                    }
                });
        })
        .catch((error) => {
            console.log("error loging in user", error);
            return res.json({ success: false });
        });
});

app.post("/reset.json", ensureSignedOut, (req, res) => {
    const { email } = req.body;

    db.getUserByEmail(email)
        .then((id) => {
            db.insertEncryptedCode(id).then((code) => {
                console.log(code);
                return res.json({
                    success: true,
                    status: "code sent",
                });
            });
        })
        .catch((error) => {
            console.log("error reseting password", error);
            return res.json({ success: false });
        });
});

app.get("/user", function (req, res) {
    db.getUserData(req.session.userId)
        .then((userData) => {
            return res.json(userData);
        })
        .catch((error) => {
            console.log("error getting user data", error);
            return res.json({ success: false });
        });
});

app.get("/showUser/:id", function (req, res) {
    if (req.params.id == req.session.userId) {
        return res.json({ self: true });
    } else {
        db.getUserData(req.params.id)
            .then((userData) => {
                if (!userData) {
                    return res.json({ noUser: true });
                }
                return res.json(userData);
            })
            .catch((error) => {
                console.log("error getting other user data", error);
                return res.json({ success: false });
            });
    }
});

// app.get("/users", function (req, res) {
//     db.getLatestUsers()
//         .then((users) => {
//             console.log(users);
//             return res.json(users);
//         })
//         .catch((error) => {
//             console.log("error getting latest users", error);
//             return res.json({ success: false });
//         });
// });

app.get("/users", function (req, res) {
    const searchString = req.query.q; // "" or "f"

    db.getUsersByFirstCharacters(searchString)
        .then((userData) => {
            return res.json(userData[0]);
        })
        .catch((error) => {
            console.log("error getting user data", error);
            return res.json({ success: false });
        });
});

app.post("/upload", uploader.single("file"), upload, function (req, res) {
    const { userId } = req.session;
    const url = "https://s3.amazonaws.com/spicedling/" + req.file.filename;

    db.updateProfilePicture(userId, url)
        .then(() => {
            res.json({ url });
        })
        .catch((error) => {
            console.log("error updating profile picture", error);
            return res.json({ success: false });
        });

    //TODO:handle errors
});

app.post("/update_bio", (req, res) => {
    const { userId } = req.session;
    const { bio } = req.body;
    db.updateBio(userId, bio)
        .then(() => {
            res.json({ bio: bio, succes: true });
        })
        .catch((error) => {
            console.log("error updating bio", error);
            return res.json({ success: false });
        });

    //TODO:handle errors
});

app.get("/friendship/:id", function (req, res) {
    const loggedUser = req.session.userId;
    const otherUser = req.params.id;

    db.getFriendship(loggedUser, otherUser)
        .then((friendshipStatus) => {
            if (!friendshipStatus) {
                return res.json({
                    friendshipRecords: false,
                    buttonText: "Add Friend",
                    buttonAction: "create",
                });
            }
            const { sender_id, accepted } = friendshipStatus;
            let senderIsSelf;
            let text;
            let action;

            if (sender_id === loggedUser) {
                senderIsSelf = true;
            } else {
                senderIsSelf = false;
            }

            if (senderIsSelf && !accepted) {
                text = "Cancel request";
                action = "delete";
            } else if (!senderIsSelf && !accepted) {
                text = "Accept request";
                action = "accept";
            } else if (accepted) {
                text = "Unfriend";
                action = "delete";
            }

            const response = {
                friendshipRecords: true,
                senderIsSelf,
                accepted: accepted,
                buttonText: text,
                buttonAction: action,
            };
            return res.json(response);
        })
        .catch((error) => {
            console.log("error getting frienship data", error);
            return res.json({ success: false });
        });
});

app.post("/friendship/create/:id", function (req, res) {
    const loggedUser = req.session.userId;
    const otherUser = req.params.id;

    db.insertFriendship(loggedUser, otherUser)
        .then((id) => {
            const response = {
                friendshipRecords: true,
                senderIsSelf: true,
                accepted: false,
                friendshipId: id,
                buttonText: "Cancel Request",
                buttonAction: "cancel",
            };
            return res.json(response);
        })
        .catch((error) => {
            console.log("error getting frienship data", error);
            return res.json({ success: false });
        });
});

app.post("/friendship/accept/:id", function (req, res) {
    const loggedUser = req.session.userId;
    const otherUser = req.params.id;

    db.acceptFriendship(otherUser, loggedUser)
        .then(() => {
            const response = {
                friendshipRecords: true,
                senderIsSelf: true,
                accepted: true,
                buttonText: "Unfriend",
                buttonAction: "cancel",
            };
            return res.json(response);
        })
        .catch((error) => {
            console.log("error getting frienship data", error);
            return res.json({ success: false });
        });
});

app.post("/friendship/delete/:id", function (req, res) {
    const loggedUser = req.session.userId;
    const otherUser = req.params.id;

    db.deleteFriendship(loggedUser, otherUser)
        .then(() => {
            const response = {
                friendshipRecords: false,
                buttonText: "Add friend",
                buttonAction: "create",
            };
            return res.json(response);
        })
        .catch((error) => {
            console.log("error getting frienship data", error);
            return res.json({ success: false });
        });
});

app.get("/friendships", function (req, res) {
    const loggedUser = req.session.userId;

    db.getFriendships(loggedUser)
        .then((friendships) => {
            return res.json(friendships);
        })
        .catch((error) => {
            console.log("error getting friendships", error);
            return res.json({ success: false });
        });
});

app.post("/logout", (req, res) => {
    req.session = null;
    res.sendStatus(200);
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(3001);
