require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("./bcrypt");
const compression = require("compression");
const path = require("path");
const db = require("./db");
const cookieSession = require("cookie-session");
const { ensureSignedOut } = require("./middlewares");

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
    // console.log(first_name, last_name, email, user_password);

    bcrypt.hash(user_password).then((hashed_password) => {
        db.createUser(email, first_name, last_name, hashed_password)
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

    bcrypt.hash(user_password).then((hashed_password) => {
        db.createUser(email, hashed_password)
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

app.post("/upload.json", function (req, res) {
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

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
