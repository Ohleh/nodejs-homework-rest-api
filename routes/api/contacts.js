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
  try {
    const { name, email, phone } = req.body;
    const addNewContact = await contactsList.addContact(req.body);
    if (!name) {
      return res.status(400).json({
        message: "missing required Name field",
      });
    }
    if (!email) {
      return res.status(400).json({
        message: "missing required Email field",
      });
    }
    if (!phone) {
      return res.status(400).json({
        message: "missing required Phone field",
      });
    }
    res.json(addNewContact);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
