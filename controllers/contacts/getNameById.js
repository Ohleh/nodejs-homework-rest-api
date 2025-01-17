const { Contact } = require("../../models/contacts");

const getNameById = async (req, res) => {
  try {
    const { contactId } = req.params;
    // дя пошуку по ID
    const getById = await Contact.findById(contactId, { name: 1, _id: 0 });
    // для пошуку по чомусь іншому
    // const getById = await Contact.findOne({ _id: contactId });
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

module.exports = getNameById;
