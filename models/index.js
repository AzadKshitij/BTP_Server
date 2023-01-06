// @ts-nocheck
"use strict";

const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const config_ = require("../config/config.json");

const db = {};

var pg = require("pg");
// pg.defaults.ssl = true;

let sequelize;
//if (config.use_env_variable) {
//  sequelize = new Sequelize(process.env[config.use_env_variable], config);

if (process.env.PRODUCTION == "true") {
  const uri = process.env.DATABASE_URI;
  console.log("🚀 ~ file: index.js ~ line 25 ~ uri", uri);

  sequelize = new Sequelize(uri);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
// db.Sequelize = Sequelize;

module.exports = db;
