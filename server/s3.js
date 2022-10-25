require("dotenv").config();

const aws = require("aws-sdk");
const fs = require("fs");
//const db = require("./db");
const secrets = process.env;

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

module.exports.upload = (req, res, next) => {
    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "spicedling",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            console.log("success");
            // it worked!!!
            //add info to db
            next();
            //res.json({});
        })
        .catch((err) => {
            // uh oh
            console.log(err);
        });
};
