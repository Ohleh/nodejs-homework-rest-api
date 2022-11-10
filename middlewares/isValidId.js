const { isValidObjectId } = require("mongoose");
// const { message } = require("../Schema/addSchema");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  const result = isValidObjectId(id);
  // повертає true або false
  if (!result) {
    // ! next(RequestError(404, `${id} is not valid id` ))
    next(res.status(404).json({ message: `${id} is not valid id` }));
  }
  next();
};
module.exports = isValidId;
