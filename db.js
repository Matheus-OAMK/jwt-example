const pg = require('pg');
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

exports.openDb = () => {
  const pool = new Pool({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  return pool;
};
