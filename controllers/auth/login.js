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
  // перевірка щоб не видавати токет тому хто ще не підтвердив мило
  if (!user.verify) {
    throw RequestError(401, "Email not verify");
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
  res.json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
