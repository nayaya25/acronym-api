const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

module.exports = app;
