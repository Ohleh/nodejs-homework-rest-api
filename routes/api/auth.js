const express = require("express");

const { validateBody } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const { register } = require("../../controllers/auth");

const router = express.Router();

router.post("/register");

module.exports = router;
