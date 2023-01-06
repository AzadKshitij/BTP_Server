// @ts-nocheck
// Importing required modules
const { Router } = require("express");
const models = require("../models");
const { Result, User } = require("../models");
const passport = require("passport");

const colors = require("colors");
colors.setTheme({
  info: "bgGreen",
  help: "cyan",
  warn: "yellow",
  success: "bgBlue",
  error: "red",
});

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// * callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/log");
  }
);

// * For logout

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
