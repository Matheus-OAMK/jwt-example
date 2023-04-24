CREATE DATABASE jwt;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  gems SMALLINT NOT NULL DEFAULT 0,
  password VARCHAR(255) NOT NULL
);

DROP TABLE users;

SELECT * FROM users;

INSERT INTO users (username, password) VALUES ('bob', 'password');

INSERT INTO users (username, password) VALUES ('fred', 'password');

--psql -U postgres
--\c jwt
--\dt
