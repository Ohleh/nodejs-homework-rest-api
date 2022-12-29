const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { Users } = require("../../models/users");

const { RequestError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

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

  const createVerificationLetter = {
    to: email,
    subject: "Confirmation registration",
    text: "To confirm new user's email, please follow link",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}"> please follow link to confirm new user</a>`,
  };
  await sendEmail(createVerificationLetter);

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
