require("dotenv").config();
const express = require("express");
const router = express.Router();

//GET welcome router
router.get("/", (req, res, next) => {
  res.json({ API: process.env.WELCOME_ROUTER });
});

module.exports = router;
