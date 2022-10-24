const contactsList = require("../../models/contacts");
const schema = require("../../Schema/addSchema");
// const Joi = require("joi");

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

const updateContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
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
};

module.exports = updateContact;
