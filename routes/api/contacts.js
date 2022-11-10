const express = require("express");
const router = express.Router();
const isValidId = require("../../middlewares/isValidId");

const ctrl = require("../../controllers/contacts");
const ctrlWrapper = require("../../helpers");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", ctrl.addContact);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeContact));

router.put("/:contactId", isValidId, ctrlWrapper(ctrl.updateContact));

router.patch(
  "/:contactId/favorite",
  isValidId,
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;
