require("dotenv").config();

const spicedPg = require("spiced-pg");
const DATABASE_URL = process.env.DATABASE_URL;

// create a db object. it can talk to the database: use db.query(...)
const db = spicedPg(DATABASE_URL);

module.exports.createUser = function (
    first_name,
    last_name,
    email,
    user_password
) {
    const sql = `
        INSERT INTO users (first_name, last_name, email, user_password)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
    `;
    return db
        .query(sql, [first_name, last_name, email, user_password])
        .then((result) => result.rows[0].id)
        .catch((error) => console.log("error inserting user", error));
};

module.exports.getUserByEmail = function (email) {
    const sql = `
        SELECT * FROM users WHERE email=$1;`;
    return db
        .query(sql, [email])
        .then((result) => [result.rows[0].user_password, result.rows[0].id])
        .catch((error) => console.log("error inserting user", error));
};

// A SELECT query to get user data when the app mounts
module.exports.getUserData = function (id) {
    const sql = `
        SELECT first_name, last_name, email, profile_picture_url, bio FROM users WHERE id=$1
    `;
    return db
        .query(sql, [id])
        .then((result) => result.rows[0])
        .catch((error) => console.log("error getting user data", error));
};

// An UPDATE query to update the user's profile picture

module.exports.updateProfilePicture = function (user_id, profile_picture_url) {
    const sql = `UPDATE users
    SET profile_picture_url = $2
    WHERE id=$1;`;

    return db
        .query(sql, [user_id, profile_picture_url])
        .catch((error) =>
            console.log("error upserting user profile picture", error)
        );
};

module.exports.updateBio = function (user_id, bio) {
    const sql = `UPDATE users
    SET bio=$2
    WHERE id=$1;`;

    return db
        .query(sql, [user_id, bio])
        .catch((error) =>
            console.log("error upserting user profile picture", error)
        );
};

module.exports.getUsersByFirstCharacters = function (searchString) {
    const sql = `
        SELECT id, first_name, last_name, profile_picture_url FROM users WHERE first_name ILIKE $1 OR last_name ILIKE $1 ORDER BY created_at DESC LIMIT 3;`;
    return db
        .query(sql, [searchString + "%"])
        .then((result) => [result.rows])
        .catch((error) => console.log("error inserting user", error));
};

// module.exports.getUsersByFirstCharacters = function (searchString) {
//     const sql = `
//         SELECT id, first_name, last_name, profile_picture_url FROM users WHERE first_name ILIKE $1;`;
//     return db
//         .query(sql, [searchString + "%"])
//         .then((result) => [result.rows])
//         .catch((error) => console.log("error inserting user", error));
// };

module.exports.getLatestUsers = function (searchString) {
    const sql = `
        SELECT id, first_name, last_name, profile_picture_url FROM users WHERE first_name ILIKE $1 ;`;
    return db
        .query(sql, [searchString + "%"])
        .then((result) => [result.rows])
        .catch((error) => console.log("error inserting user", error));
};

// ORDER BY id DESC
//             LIMIT 3
