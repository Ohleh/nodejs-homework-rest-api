const express = require("express");
const router = express.Router();
const Joi = require("joi");

const contactsList = require("../../models/contacts");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const AllContacts = await contactsList.listContacts();
    res.status(200).json(AllContacts);
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
    res.status(200).json(getById);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing required name field" });

      // const error = new Error("missing required name field");
      // error.status = 400;
      // res.status(400);
      // throw error;
    }
    const addNewContact = await contactsList.addContact(req.body);
    res.status(201).json(addNewContact);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removeContact = await contactsList.removeContact(contactId);
    if (!removeContact) {
      return res
        .status(404)
        .json({ message: "This contactId doesn`t exist, nothing to remove" });
    }
    // 204 але не пишемо, ставиться автоматом
    res.status(200).json({
      message: `Contact with ${contactId} successfully deleted`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing required name field" });
    }
    const { contactId } = req.params;

    const updadeData = await contactsList.updateContact(contactId, req.body);
    if (!updadeData) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    res.status(200).json(updadeData);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
