const express = require("express");
const router = express.Router();

const contactsList = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const AllContacts = await contactsList.listContacts();
    res.json(AllContacts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const getById = await contactsList.getContactById(contactId);
    if (!getById) {
      return res.status(404).json({ message: "not found by this id" });
    }
    res.json(getById);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
