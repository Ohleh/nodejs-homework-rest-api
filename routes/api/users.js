const express = require("express");
const router = express.Router();
// const multer = require("multer");
// const path = require("path");

const ctrl = require("../../controllers/auth");
const sub = require("../../controllers/subscription");

const { validateBody, autheticate, upload } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const { schemas } = require("../../models/users");

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

// update user avatar
router.patch(
  "/avatars",
  autheticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

// verification-request
router.get("/verify/:verificationToken", verificationToken);

module.exports = router;
