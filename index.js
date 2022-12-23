const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/auth", require("./src/routes/auth"));

app.listen(process.env.PORT || 3001, () => {
  console.log(`Running on port: ${process.env.PORT || 3001}`);
});
