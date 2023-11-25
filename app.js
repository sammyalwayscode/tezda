require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

// Include routes
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

module.exports = app;
