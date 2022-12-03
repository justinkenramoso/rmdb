// importing packages
const express = require("express");
const router = express.Router();

// Default (Characters/all)
router.get("/", (req, res) => {
  res.redirect("/characters/all/?page=1");
});

module.exports = router;
