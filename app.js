// https://github.com/BogdanLyamzin/Node.js-45-46/tree/master/lesson-4

// const dotenv = require("dotenv");
// const DB_HOST = require("./config");
// dotenv.config();
// const { DB_HOST } = process.env;
// console.log(DB_HOST);

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
// або
// const dotenv = require("dotenv");
// dotenv.config();

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/tasks",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

module.exports = app;
