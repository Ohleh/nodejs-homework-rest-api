const contactsList = require("../../models/contacts");
const schema = require("../../Schema/addSchema");

const addContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
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
};

module.exports = addContact;
