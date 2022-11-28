const express = require("express");

const ctrl = require("../../controllers/auth");
const sub = require("../../controllers/subscription");
const up = require("../../controllers/upload");

const { validateBody, autheticate } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const { schemas } = require("../../models/users");

const router = express.Router();

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

router.get("/avatars", autheticate, ctrlWrapper(up.uploadAvatar));

module.exports = router;
