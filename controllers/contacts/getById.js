const Contact = require("../../models/contacts");

const getById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const getById = await Contact.findOne({ _id: contactId });
    if (!getById) {
      return res.status(404).json({ message: "not found by this id" });
    }
    res.status(200).json(getById);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = getById;
