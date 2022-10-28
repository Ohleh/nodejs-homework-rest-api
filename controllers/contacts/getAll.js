const contactsList = require("../../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const AllContacts = await contactsList.listContacts();
    res.status(200).json(AllContacts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = getAll;
