require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("./bcrypt");
const compression = require("compression");
const path = require("path");
const db = require("./db");
const cookieSession = require("cookie-session");
const { ensureSignedOut, uploader } = require("./middlewares");
const { upload } = require("./s3");

app.use(express.json());

app.use(compression());

app.use(
    cookieSession({
        secret: process.env.SESSION_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);
app.use(express.static(path.join(__dirname, "..", "client", "public")));

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
    // GET /user endpoint to fetch the current user's data (based on the id in the session cookie)
    db.getUserData(req.session.userId)
        .then((userData) => {
            return res.json(userData);
        })
        .catch((error) => {
            console.log("error getting user data", error);
            return res.json({ success: false });
        });
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
            console.log(userData[0]);
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
    // GET /user endpoint to fetch the current user's data (based on the id in the session cookie)
    const { userId } = req.session;
    const { bio } = req.body;

    console.log({ userId, bio });

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

app.post("/logout", (req, res) => {
    req.session = null;
    res.sendStatus(200);
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
