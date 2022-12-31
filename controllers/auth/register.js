const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { Users } = require("../../models/users");

const {
  RequestError,
  sendEmail,
  createVerifySending,
} = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await Users.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const newUser = await Users.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = createVerifySending(email, verificationToken);

  await sendEmail(mail);

  res.status(201).json({
    user: {
      // name: newUser.name,
      email: newUser.email,
      subscription: "starter",
      message: "Successfuly registered. Please Sign in to enter",
      avatar: avatarURL,
      verificationToken: newUser.verificationToken,
    },
  });
};

module.exports = register;
