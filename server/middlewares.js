// check imageboard projects to remmeber set up
const path = require("path");
const multer = require("multer");
const uidSafe = require("uid-safe");

module.exports.ensureSignedOut = (req, res, next) => {
    next();
};

const storage = multer.diskStorage({
    destination: path.join(__dirname, "uploads"),
    filename: (req, file, callback) => {
        uidSafe(24).then((uid) => {
            const extension = path.extname(file.originalname);
            const randomFileName = uid + extension;
            callback(null, randomFileName);
        });
    },
});

module.exports.uploader = multer({
    storage,
    limits: {
        fileSize: 2097152,
    },
});
