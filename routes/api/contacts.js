const express = require("express");
const router = express.Router();

const contactsJson = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const AllContacts = await contactsJson.listContacts();
    res.json(AllContacts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
  // res.json({
  //   status: "success",
  //   code: 200,
  //   data: {
  //     AllContacts,
  //   },
  // });
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { id } = req.params;
    const getById = await contactsJson.getContactById(id);
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
