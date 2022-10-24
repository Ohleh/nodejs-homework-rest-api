const contactsList = require("../../models/contacts");

const removeContact = async (req, res, next) => {
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
};

module.exports = removeContact;
