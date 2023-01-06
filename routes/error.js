// @ts-nocheck
const { Router } = require("express");
const { Result, User, Item, Game, Error } = require("../models");
// const Op = require("sequelize").Op;
const colors = require("colors");

colors.setTheme({
  info: "bgGreen",
  help: "cyan",
  warn: "yellow",
  success: "bgBlue",
  error: "red",
});

const router = Router();

router.post("/submitErrors", async (req, res) => {
  // Submit Errors
  const {
    email,
    Solder_Break,
    Non_Standard,
    Forgets_To_Buy,
    Doesnt_Meet_Specs,
    Circuit_Doesnt_Match,
    Component_Damage,
  } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });
    const errors = await Error.create({
      userId: user.id,
      email: user.email,
      Solder_Break: Solder_Break,
      Non_Standard: Non_Standard,
      Forgets_To_Buy: Forgets_To_Buy,
      Doesnt_Meet_Specs: Doesnt_Meet_Specs,
      Circuit_Doesnt_Match: Circuit_Doesnt_Match,
      Component_Damage: Component_Damage,
    });
    return res.json(errors);
  } catch (err) {
    console.log("Got Error in error at 38".error, err);
    return res.status(500).json(err);
  }
});

module.exports = router;
