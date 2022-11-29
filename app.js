// https://github.com/BogdanLyamzin/Node.js-45-46/tree/master/lesson-4

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/users");
const FILE_DIR = path.resolve("./public/avatars");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);
app.use("/avatars", express.static(FILE_DIR));

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use correct http adress",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Internal Server Error" } = err;
  res.status(status).json({ message });
  // console.log(err.stack);
  // res.status(500).json({
  //   status: "fail",
  //   code: 500,
  //   message: err.message,
  //   data: "Internal Server Error",
  // });
});

module.exports = app;
