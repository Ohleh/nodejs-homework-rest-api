const express = require("express");
// const { object, string } = require("joi");
const router = express.Router();
// const Joi = require("joi");

const contactsList = require("../../models/contacts");

// const addSchema = Joi.object({
//   title: Joi.string(),
//   email: Joi.string(),
// });

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
    // const { error } = addSchema.validate(req.body);
    // const { name, email, phone } = req.body;
    const addNewContact = await contactsList.addContact(req.body);
    // if (error) {
    //   res.status(400).json({ message: "missing required name field" });
    // }
    // if (!name) {
    //   return res.status(400).json({
    //     message: "missing required Name field",
    //   });
    // }
    // if (!email) {
    //   return res.status(400).json({
    //     message: "missing required Email field",
    //   });
    // }
    // if (!phone) {
    //   return res.status(400).json({
    //     message: "missing required Phone field",
    //   });
    // }
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
    // if (!contactId) {
    //   res
    //     .status(404)
    //     .json({ message: "this ID doesn`t exist, nothing to remove" });
    // }
    res.json(removeContact);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    // const { name, email, phone } = req.body;
    if (!req.body) {
      res.status(400).json({
        message: "missing fields",
      });
    }
    const updadeData = await contactsList.updateContact(contactId, req.body);
    res.status(200).json(updadeData);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
