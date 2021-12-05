const Sequelize = require("sequelize");
require("dotenv").config();

const DEV_DB = process.env.DEV_DB;
const DEV_DB_USERNAME = process.env.DEV_DB_USERNAME;
const DEV_DB_PASSWORD = process.env.DEV_DB_PASSWORD;

// Option 3: Passing parameters separately (other dialects)
const db = new Sequelize(DEV_DB, DEV_DB_USERNAME, DEV_DB_PASSWORD, {
  host: "localhost",
  dialect: "postgres",
});

module.exports = db;
