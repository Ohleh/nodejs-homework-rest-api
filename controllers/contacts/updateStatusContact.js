const { Contact } = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updadeData = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    // додаємо об'єкт {new: true}, щоб метод findByIdAndUpdate повертав нову версію, а не стару
    if (!updadeData) {
      throw RequestError(404, "not found");
    }
    // ! res.json(updadeData);
    res.status(200).json(updadeData);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = updateStatusContact;
