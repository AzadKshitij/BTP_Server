// @ts-nocheck
const { Router } = require("express");
const { Shop } = require("../models");

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
  const { type, unit, values, description } = req.body;
  console.log(req.body);
  try {
    await Shop.create({
      type: type,
      unit: unit,
      value: values,
      description: description,
    });
    return res.redirect("/api/shop/addItem");
  } catch {
    console.log("Got Error in post at 28".error, err);
    return res.status(500).json(err);
  }
});

router.get("/addItem", async (req, res) => {
  res.render("addshopitem");
});

router.get("/availableItems", async (req, res) => {
  try {
    const results = await Shop.findAll({ order: [["id", "ASC"]] });
    return res.status(200).json({ data: results });
  } catch (err) {
    console.log("Got Error in post at 31".error, err);
    return res.status(500).json(err);
  }
});

router.get("/allItems", async (req, res) => {
  try {
    const results = await Shop.findAll({ order: [["id", "ASC"]] });

    return res.render("allShopItems", { results: results });
  } catch (err) {
    console.log("Got Error in post at 31".error, err);
    return res.status(500).json(err);
  }
});

// Update item route
router.post("/updateItem", async (req, res) => {
  // Get item from route and update in database
  const id = req.query.id;
  const { type, unit, values, description } = req.body;
  try {
    const result = await Shop.update(
      {
        type: type,
        unit: unit,
        value: values,
        description: description,
      },
      { where: { id: id } }
    );
    return res.redirect("/api/shop/allItems");
  } catch (err) {
    console.log("Got Error in post at 31".error, err);
    return res.status(500).json(err);
  }
});

module.exports = router;
