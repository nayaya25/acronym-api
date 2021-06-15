const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const jsonParser = express.json();

const app = express();

app.use(jsonParser);
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

module.exports = app;
