// importing packages
const express = require("express");
const router = express.Router();

// Fetch
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

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

// Get Current Page
// function getCurrentPage(info) {
//   let prev = null;
//   let next = null;
//   if (info.prev) {
//     const prevUrl = info.prev;
//     const a = prevUrl.lastIndexOf("=");
//     prev = parseInt(prevUrl.substring(a + 1));
//   }
//   if (info.next) {
//     const nextUrl = info.next;
//     const b = nextUrl.lastIndexOf("=");
//     next = parseInt(nextUrl.substring(b + 1));
//   }
//   let currentPage = 0;
//   if (!prev && !next) {
//     currentPage = 1;
//   } else if (!prev) {
//     currentPage = next - 1;
//   } else if (!next) {
//     currentPage = prev + 1;
//   } else {
//     currentPage = next - 1;
//   }
//   return currentPage;
// }

// Get All Characters
router.get("/all", async function (req, res) {
  const requestedPage = req.query.page;
  const url =
    "https://rickandmortyapi.com/api/character/?page=" + requestedPage;
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
    if (response.results) {
      processResults(response.results);
    }
    // const currentPage = getCurrentPage(response.info);
    res.render("characters", {
      pagination: {
        page: parseInt(req.query.page),
        limit: response.info.pages,
        totalRows: response.info.pages * response.info.pages,
      },
      response,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Error: ${err}` });
  }
});

// Filter
router.get("/filter", async function (req, res) {
  const filters = [];
  if (req.query.name != "") {
    const name = "name=" + req.query.name;
    filters.push(name);
  }
  if (req.query.status != "none") {
    const status = "status=" + req.query.status;
    filters.push(status);
  }
  if (req.query.species != "none") {
    const species = "species=" + req.query.species;
    filters.push(species);
  }
  if (req.query.gender != "none") {
    const gender = "gender=" + req.query.gender;
    filters.push(gender);
  }
  const requestedPage = "page=" + req.query.page;
  filters.push(requestedPage);

  const url = `https://rickandmortyapi.com/api/character/?${filters.join("&")}`;
  console.log(url);
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
    if (response.results) {
      processResults(response.results);
    }
    let pageCount = 0;
    if (response.info) {
      pageCount = response.info.pages;
    }
    res.render("characters", {
      pagination: {
        page: parseInt(req.query.page),
        limit: pageCount,
        totalRows: pageCount * pageCount,
      },
      response,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Internal Server Error.` });
  }
});

// Random

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

router.get("/random", async function (req, res) {
  // The random IDs are stored here.
  const randomIDArray = [];

  // There are 826 characters.
  for (let i = 0; i < 20; i++) {
    let randomID = getRandomNumber(1, 826);
    randomIDArray.push(randomID);
  }

  const url = `https://rickandmortyapi.com/api/character/${randomIDArray}`;
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
    if (response) {
      processResults(response);
    }
    res.render("characters", { response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Internal Server Error.` });
  }
});

// Move Page
router.get("/page", async function (req, res) {
  const decodedURI = decodeURIComponent(req.query.url);
  const url = decodedURI;
  console.log(url);
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
    if (response.results) {
      processResults(response.results);
    }
    res.render("characters", { response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Internal Server Error.` });
  }
});

module.exports = router;
