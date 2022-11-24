const bcrypt = require("bcryptjs");

const { Users } = require("../../models/users");

const { RequestError } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await Users.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await Users.create({
    name,
    email,
    password: hashPassword,
  });
  res.status(201).json({
    user: {
      // name: newUser.name,
      email: newUser.email,
      subscription: "starter",
      message: "Successfuly registered. Please login to enter",
    },
  });
};

module.exports = register;
