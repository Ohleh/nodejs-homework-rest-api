const express = require("express");
const router = express.Router();
const { schema } = require("../../models/contacts");
const { isValidId, validateBody, autheticate } = require("../../middlewares");

const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");

router.get("/", autheticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", autheticate, isValidId, ctrlWrapper(ctrl.getById));

router.get(
  "/name/:contactId",
  autheticate,
  isValidId,
  ctrlWrapper(ctrl.getNameById)
);

router.post("/", autheticate, validateBody(schema.addSchema), ctrl.addContact);

router.delete(
  "/:contactId",
  autheticate,
  isValidId,
  ctrlWrapper(ctrl.removeContact)
);

router.put(
  "/:contactId",
  autheticate,
  isValidId,
  validateBody(schema.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  autheticate,
  validateBody(schema.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
