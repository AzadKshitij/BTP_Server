// @ts-nocheck
const { Router } = require("express");
const { Result, User, Item } = require("../models");

const colors = require("colors");

colors.setTheme({
  info: "bgGreen",
  help: "cyan",
  warn: "yellow",
  success: "bgBlue",
  error: "red",
});

const router = Router();

router.post("/addItem", async (req, res) => {
  const { price, quantity, unit, value, name, description } = req.body;

  try {
    await Item.create({
      price: price,
      quantity: quantity,
      unit: unit,
      value: value,
      name: name,
      description: description,
    });

    return res.redirect("/api/item/allItems");
  } catch (err) {
    console.log("Got Error in post at 31".error, err);
    return res.status(500).json(err);
  }
});

router.get("/addItem", async (req, res) => {
  res.render("additem");
});

router.get("/allItems", async (req, res) => {
  try {
    const results = await Item.findAll({ order: [["id", "ASC"]] });

    return res.render("allItems", { results: results });
  } catch (err) {
    console.log("Got Error in post at 31".error, err);
    return res.status(500).json(err);
  }
});

router.get("/availableItems", async (req, res) => {
  try {
    const results = await Item.findAll({ order: [["id", "ASC"]] });
    return res.status(200).json({ data: results });
  } catch (err) {
    console.log("Got Error in post at 31".error, err);
    return res.status(500).json(err);
  }
});

router.post("/updateItem", async (req, res) => {
  try {
    const id = req.query.id;
    const { price, quantity, unit, value, name, description } = req.body;
    const results = await Item.update(
      {
        price: price,
        quantity: quantity,
        unit: unit,
        value: value,
        name: name,
        description: description,
      },
      { where: { id: id } }
    );

    return res.json(results);
  } catch (err) {
    console.log("Got Error in post at 31".error, err);
    return res.status(500).json(err);
  }
});

module.exports = router;
