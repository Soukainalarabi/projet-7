const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
require("./sequelize");
const { Sequelize } = require("sequelize");
const userRoutes = require("./routes/user");
const pubRoutes = require("./routes/publication");
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/publications", pubRoutes);

app.use("/api/auth", userRoutes);
module.exports = app;
