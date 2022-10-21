const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.post(
    "/user/id.json",
    /* ensureSignedOut ,*/ function (req, res) {
        const { first_name, last_name, email, password } = req.body;
        console.log({ first_name, last_name, email, password });
        // db.insertUser(first_name, last_name, email, password).then((id) => {
        //     req.session.userId = id;
        //     res.json(id);
        // });
    }
);

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
