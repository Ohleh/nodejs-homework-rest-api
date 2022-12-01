const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { Users } = require("../../models/users");

const { RequestError } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await Users.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const newUser = await Users.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
  });
  // const avatarURL = gravatar.url(
  //   newUser.email,
  //   { s: "100", r: "x", d: "retro" },
  //   true
  // );
  res.status(201).json({
    user: {
      // name: newUser.name,
      email: newUser.email,
      subscription: "starter",
      message: "Successfuly registered. Please Sign in to enter",
      avatar: avatarURL,
    },
  });
};

module.exports = register;
