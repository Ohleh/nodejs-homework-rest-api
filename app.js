// https://github.com/BogdanLyamzin/Node.js-45-46/tree/master/lesson-4

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
// const multer = require("multer");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/users");
const tmpDir = path.join(__dirname, "tmp");
// const fileDir = path.resolve("./public/avatars");
// const fileDir = path.join(__dirname, "public", "avatars");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // щоб express не блокував доступ до статичного файла з розшиненням, в папці public

// const multerConfig = multer.diskStorage({
//   destination: tmpDir,
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: multerConfig,
// });

// app.post("/api/avatars", upload.single("avatar"), async (req, res) => {
//   console.log(req.body);
//   console.log(req.file);
// });
// upload.array("cover", 8) - якщо кілька файлів, а 8 - кількість
// upload.fields([{name:  "cover", maxCount: 1}, {name: "subcover", maxCount: 4}])
// maxCount - максимальна кількість файлій яка буде передаватися
//
// cover - назва поля у формі куди передається файл
// в req.body - текстові дані зі всієї форми
// в req.file - інформмція про файл який я передав

app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);
app.use("/avatars", express.static(tmpDir));
// express.static - для читання

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
