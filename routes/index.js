const router = require("express").Router();

const profile = require("./profile");
const result = require("./result");
const auth = require("./auth");
const google = require("./google");
const question = require("./question");
const item = require("./item");
const game = require("./game");
const error = require("./error");
const shop = require("./shop");

//importing middleware
const { ensureAuth, ensureGuest } = require("../middleware/auth");

module.exports = {
  profile,
  result,
  auth,
  google,
  item,
  question,
  game,
  error,
  shop,
};
