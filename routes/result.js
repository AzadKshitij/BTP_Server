// @ts-nocheck
const { Router } = require("express");
const models = require("../models");
const { Result, User } = require("../models");
const fetch = require("node-fetch");

const colors = require("colors");
colors.setTheme({
  info: "bgGreen",
  help: "cyan",
  warn: "yellow",
  success: "bgBlue",
  error: "red",
});

const router = Router();

router.post("/addResult", async (req, res) => {
  const { email, time, money, score, xp } = req.body;
  console.log(xp);
  try {
    const user = await User.findOne({ where: { email: email } });

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    today = dd + "-" + mm + "-" + yyyy;

    const result = await Result.create({
      userId: user.id,
      name: user.name,
      email: user.email,
      time: time,
      money: money,
      score: score,
      rollNo: user.rollNo,
      date: today,
      xp: xp,
    });

    return res.json(result);
  } catch (err) {
    console.log("Got Error in post at 31".error, err);
    return res.status(500).json(err);
  }
});

router.get("/allResults", async (req, res) => {
  try {
    let results = "";
    let date_ = "";
    if (!req.query.date) {
      // results = await Result.findAll({
      //   order: [["score", "ASC"]],
      // });
      results = await fetch(
        "https://circuit-maverick.herokuapp.com/api/result/allResults"
      );
      return res.render("allResults", { results: results.reverse() });
    } else {
      date_ = req.query.date;
      results = await Result.findAll({
        where: { date: date_ },
        order: [["score", "ASC"]],
      });
    }

    return res.json(results);
  } catch (err) {
    console.log("Got Error in post at 31".error, err);
    return res.status(500).json(err);
  }
});

router.get("/userResults/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({ where: { email: email } });
    const results = await Result.findAll({
      where: { userId: user.id },
      order: [["updatedAt", "DESC"]],
    });

    return res.json(results);
  } catch (err) {
    console.log("Got Error in post at 31".error, err);
    return res.status(500).json(err);
  }
});

module.exports = router;
