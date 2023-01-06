// @ts-nocheck
const { Router } = require("express");
const { Result, User, Item, Game } = require("../models");
const Op = require("sequelize").Op;
const colors = require("colors");

colors.setTheme({
  info: "bgGreen",
  help: "cyan",
  warn: "yellow",
  success: "bgBlue",
  error: "red",
});

const router = Router();

router.post("/addGame", async (req, res) => {
  const { startDate, startTime, endDate, endTime } = req.body;
  let startDateTime = new Date(startDate + " " + startTime);
  let endDateTime = new Date(endDate + " " + endTime);
  try {
    await Game.create({
      startTime: startDateTime,
      endTime: endDateTime,
    });

    return res.redirect("/api/game/addGame");
  } catch (err) {
    console.log("Got Error in game at 29".error, err);
    return res.status(500).json(err);
  }
});

router.get("/addGame", async (req, res) => {
  res.render("addGame");
});

router.get("/getAvailableGames", async (req, res) => {
  //2021-12-14 23:00:00+05:30
  //today 2021-12-15T10:26:13.065Z
  //today 2021-12-15T10:40:59.920Z
  // Get date as per indian standard time
  // const today = new Date(); // ("yyyy-mm-dd HH:MM:ss");

  var dateUTC = new Date();
  var dateUTC = dateUTC.getTime();
  var dateIST = new Date(dateUTC);
  //date shifting for IST timezone (+5 hours and 30 minutes)
  dateIST.setHours(dateIST.getHours() + 5);
  dateIST.setMinutes(dateIST.getMinutes() + 30);
  // console.log("---------------------------------");
  // console.log("*********************************");
  // console.log("today", dateIST);
  // console.log("today", today);
  // console.log("*********************************");
  // console.log("---------------------------------");
  try {
    const games = await Game.findAll({
      where: {
        startTime: {
          [Op.lt]: dateIST,
        },
        endTime: {
          [Op.gt]: dateIST,
        },
      },
    });
    // const games = await Game.findAll();
    return res.json(games);
  } catch (err) {
    console.log("Got Error in game at 28".error, err);
    return res.status(500).json(err);
  }
});

module.exports = router;
