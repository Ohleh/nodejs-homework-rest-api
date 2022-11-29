const express = require("express");
const router = express.Router();
const path = require("path");

const ctrl = require("../../controllers/auth");
const sub = require("../../controllers/subscription");
const up = require("../../controllers/upload");

const { validateBody, autheticate } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const { schemas } = require("../../models/users");

const FILE_DIR = path.resolve("./public/avatars");

// signup
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

// signin
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", autheticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", autheticate, ctrlWrapper(ctrl.logout));

// subscription
router.patch(
  "/",
  autheticate,
  // validateBody(schemas.subscriptionSchema),
  ctrlWrapper(sub.subscription)
);

router.post("/avatars", autheticate, ctrlWrapper(up.uploadAvatar));
router.use("/avatars", express.static(FILE_DIR));

module.exports = router;
