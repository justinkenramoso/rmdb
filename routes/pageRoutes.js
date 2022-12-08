// importing packages
const express = require("express");
const router = express.Router();

// Fetch
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Default (Characters/all)
router.get("/", (req, res) => {
  res.redirect("/characters/all/?page=1");
});

// Locations
router.get("/locations", async (req, res) => {
  const locals = {
    title: "Locations | RMDB",
    locations: true,
  };
  const url = "https://rickandmortyapi.com/api/location?page=" + req.query.page;
  const options = {
    method: "GET",
  };
  // promise syntax
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error("error:" + err));
  try {
    let response = await fetch(url, options);
    response = await response.json();
    res.status(200);
    console.log(req.query.page);
    res.render("locations", {
      pagination: {
        page: parseInt(req.query.page),
        limit: response.info.pages,
        totalRows: response.info.pages * response.info.pages,
      },
      response,
      locals,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Error: ${err}` });
  }
});

// Episodes
router.get("/episodes", (req, res) => {
  const locals = {
    title: "episodes | RMDB",
    episodes: true,
  };
  res.render("episodes", { locals });
});

module.exports = router;
