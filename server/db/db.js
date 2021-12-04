const Sequelize = require("sequelize");

const db = new Sequelize(
  "postgres://postgres:hatchways@localhost:5432/messenger",
  { logging: false }
); // Example for postgres

module.exports = db;
