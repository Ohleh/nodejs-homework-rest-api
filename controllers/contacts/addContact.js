const Contact = require("../../models/contacts");
const schema = require("../../Schema/addSchema");

const addContact = async (req, res) => {
  //
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing required name field" });
    }
    //
    const addNewContact = await Contact.create(req.body);
    res.status(201).json(addNewContact);
    //
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = addContact;
