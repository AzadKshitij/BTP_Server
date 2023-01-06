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

// * Requests

router.post("/", async (req, res) => {
  const { name, googleId, email, rollNo, avatar } = req.body;
  try {
    const user = await User.create({ name, googleId, email, rollNo, avatar });

    return res.json(user);
  } catch (err) {
    console.log("Error In Profile: ".error, err);
    return res.status(500).json(err);
  }
});

router.post("/updateUser", async (req, res) => {
  const avatar_ = req.query.avatar;
  const email_ = req.query.email;
  try {
    const user = await User.update(
      { avatar: avatar_ },
      { where: { email: email_ } }
    );

    return res.json(user);
  } catch (err) {
    console.log("Error In Profile: ".error, err);
    return res.status(500).json(err);
  }
});

router.get("/checkUser", async (req, res) => {
  const email_ = req.query.email;
  try {
    const user = await User.findOne({ where: { email: email_ } });
    return user ? res.json(user) : res.status(500).json(err);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/allUsers", async (req, res) => {
  const results = await User.findAll();

  return res.render("allUsers", { results: results });
});

// ---------------------- XP ----------------------------

router.post("/updateXP", async (req, res) => {
  const { xp, email } = req.body;
  try {
    const user = await User.update({ xp: xp }, { where: { email: email } });

    return res.json(user);
  } catch (err) {
    console.log("Error In Profile: ".error, err);
    return res.status(500).json(err);
  }
});

// Get user xp
router.get("/getXP", async (req, res) => {
  const email_ = req.query.email;
  try {
    const user = await User.findOne({ where: { email: email_ } });
    return user ? res.json(user) : res.status(500).json(err);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
