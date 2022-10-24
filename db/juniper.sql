DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL CHECK(first_name != ''),
    last_name VARCHAR(255) NOT NULL CHECK(last_name != ''),
    email VARCHAR(255) NOT NULL CHECK(email != '') UNIQUE,
    user_password TEXT NOT NULL CHECK (user_password != ''),
    profile_picture_url VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );