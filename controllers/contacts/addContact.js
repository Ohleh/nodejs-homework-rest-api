const { Contact } = require("../../models/contacts");

const addContact = async (req, res) => {
  try {
    const { _id: owner } = req.user;
    const addNewContact = await Contact.create({ ...req.body, owner });
    res.status(201).json(addNewContact);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = addContact;
