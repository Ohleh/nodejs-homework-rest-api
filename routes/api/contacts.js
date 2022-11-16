const express = require("express");
const router = express.Router();
const { schema } = require("../../models/contacts");
const { isValidId, validateBody } = require("../../middlewares");

const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.get("/name/:contactId", isValidId, ctrlWrapper(ctrl.getNameById));

router.post("/", validateBody(schema.addSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  isValidId,
  validateBody(schema.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schema.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
