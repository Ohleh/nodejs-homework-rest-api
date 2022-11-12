const { Contact } = require("../../models/contacts");

const addContact = async (req, res) => {
  try {
    const addNewContact = await Contact.create(req.body);
    res.status(201).json(addNewContact);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = addContact;
