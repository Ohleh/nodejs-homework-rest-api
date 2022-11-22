const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// require("dotenv").config();

const { Users } = require("../../models/users");

const { RequestError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email not found");
  }
  const comparePasword = bcrypt.compare(password, user.password);
  if (!comparePasword) {
    throw RequestError(401, "Password wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await Users.findByIdAndUpdate(user._id, { token });
  res.json({ token });
};

module.exports = login;
