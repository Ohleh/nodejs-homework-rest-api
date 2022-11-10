const Contact = require("../../models/contacts");
const schema = require("../../Schema/addSchema");

const updateContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing required name field" });
    }
    const { contactId } = req.params;

    const updadeData = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    // додаємо об'єкт {new: true}, щоб метод findByIdAndUpdate повертав нову версію, а не стару
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
