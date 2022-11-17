const { Users } = require("../../models/users");

const { RequestError } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await Users.findOne({ email });
  if (user) {
    throw RequestError(409, "Email is used");
  }
  const newUser = await Users.create({
    name,
    email,
    password,
  });
  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

module.exports = register;
