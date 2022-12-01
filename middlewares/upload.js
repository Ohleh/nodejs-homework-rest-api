const path = require("path");
const multer = require("multer");

const tmpDir = path.join(__dirname, "../", "tmp");
// const tmpDir = path.resolve("../tmp");
// "../" - щоб шукав в корені проекту

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;

//
// const FILE_DIR = path.resolve("./public/avatars");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, FILE_DIR);
//   },
//   filename: (req, file, cb) => {
// const [name, extention] = file.originalname.split(".");
//     cb(null, `${name}.${extention}`);
//   },
// });
//
// router.use("/avatars", express.static(FILE_DIR));
