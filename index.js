const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const port = 5600;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(express.json());

// Template Engine
app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

// Routes
const pageRoutes = require("./routes/pageRoutes");
app.use("/", pageRoutes);
const characterRoutes = require("./routes/characterRoutes");
app.use("/characters", characterRoutes);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running.`);
    console.log(`Port: ${port}`);
  }
});
