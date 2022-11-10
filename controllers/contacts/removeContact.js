const { Contact } = require("../../models/contacts");
// const { RequestError } = require("../../helpers");

const removeContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const removeContact = await Contact.findByIdAndRemove(contactId);
    if (!removeContact) {
      // ! throw RequestError(404, "not found");
      return res
        .status(404)
        .json({ message: "This contactId doesn`t exist, nothing to remove" });
    }
    // ! res.json({message: "Book removed"});
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
