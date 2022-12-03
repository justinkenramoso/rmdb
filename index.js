const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const paginateHelper = require("express-handlebars-paginate");
const bodyParser = require("body-parser");
const path = require("path");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(express.json());

// Template Engine
app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",
    helpers: {
      paginate: paginateHelper.createPagination,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, ".", "views"));
// Handlebars-Paginate
console.log(paginateHelper.createPagination);
// Routes
const pageRoutes = require("./routes/pageRoutes");
app.use("/", pageRoutes);
const characterRoutes = require("./routes/characterRoutes");
app.use("/characters", characterRoutes);

require("dotenv").config();
const port = process.env.PORT || 5600;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running.`);
    console.log(`Port: ${port}`);
  }
});
