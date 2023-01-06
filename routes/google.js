// @ts-nocheck
const { Router } = require("express");
const models = require("../models");
const { User } = require("../models");

const colors = require("colors");
colors.setTheme({
  info: "bgGreen",
  help: "cyan",
  warn: "yellow",
  success: "bgBlue",
  error: "red",
});

const router = Router();

//importing middleware
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureGuest, (req, res) => {
  res.render("login");
});

router.get("/log", ensureAuth, async (req, res) => {
  res.render("index", { userinfo: req.user });
});

module.exports = router;
