const { isValidObjectId } = require("mongoose");
// const { message } = require("../Schema/addSchema");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);
  // повертає true або false
  if (!result) {
    // ! next(RequestError(404, `${id} is not valid id` ))
    next(res.status(404).json({ message: `${contactId} is not valid id` }));
  }
  next();
};
module.exports = isValidId;
