const { Contact, schema } = require("../../models/contacts");
// const schema = require("../../Schema/addSchema");

const updateFavorite = async (req, res, next) => {
  try {
    const { error } = schema.addSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing required name field" });
    }
    const { contactId } = req.params;

    const updadeData = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!updadeData) {
      // ! throw RequestError(404, "not found");
      return res.status(404).json({
        message: "Not found",
      });
    }
    // ! res.json(updadeData);
    res.status(200).json(updadeData);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = updateFavorite;
