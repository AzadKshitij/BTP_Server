// @ts-nocheck
const { Router } = require("express");
const models = require("../models");
const { Result, User, Question } = require("../models");

const colors = require("colors");
colors.setTheme({
  info: "bgGreen",
  help: "cyan",
  warn: "yellow",
  success: "bgBlue",
  error: "red",
});

const router = Router();

let question = [];

router.get("/addQuestion", async (req, res) => {
  console.log("Questions query : ".blue, req.query);
  if (req.query.name) {
    question.push(req.query.name);
  }

  res.render("addQuestion", {
    deleteProduct: deleteProduct,
    question: question,
  });
});

router.post("/addQuestion", async (req, res) => {
  question = [];
  const { problem, type, data } = req.body;
  try {
    const result = await Question.create({
      problem: problem,
      type: type,
      data: data,
    });

    return res.json(result);
  } catch (err) {
    console.log("Got Error in post at 31".error, err);
    return res.status(500).json(err);
  }
});

router.get("/allQuestions", async (req, res) => {
  try {
    const result = await Question.findAll();
    return res.json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
