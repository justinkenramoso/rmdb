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

// One Location
router.get("/locations/specify/", async (req, res) => {
  const locals = {
    title: "Locations | RMDB",
    locations: true,
    locationName: req.query.name,
    locationType: req.query.type,
    locationDimension: req.query.dimension,
    locationResidents: req.query.residents,
  };
  const url =
    "https://rickandmortyapi.com/api/character/" +
    locals.locationResidents.toString();
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
    processResults(response);
    res.render("locations", {
      response,
      locals,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Error: ${err}` });
  }
});

// Episodes
router.get("/episodes", async (req, res) => {
  const locals = {
    title: "Episodes | RMDB",
    episodes: true,
  };
  const url = "https://api.yomomma.info/";
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
    res.render("episodes", {
      response,
      locals,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Error: ${err}` });
  }
});

// Some helper functions-------------------------------->

// Add color properties for character info
function processResults(results) {
  // Status Colors
  for (let i = 0; i < results.length; i++) {
    if (results[i].status == "Alive") {
      results[i].statusColor = "alive";
    } else if (results[i].status == "Dead") {
      results[i].statusColor = "dead";
    }
  }
  // Type (display "not specified" instead of "")
  for (let i = 0; i < results.length; i++) {
    if (results[i].type == "") {
      results[i].type = "none";
    }
  }
}

module.exports = router;
