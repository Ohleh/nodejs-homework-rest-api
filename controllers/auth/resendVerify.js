const { Users } = require("../../models/users");

const {
  RequestError,
  createVerifySending,
  sendEmail,
} = require("../../helpers");

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await Users.findOne({ email });
  if (!user) {
    throw RequestError(400, "Email not found");
  }
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }
  const send = createVerifySending(email, user.verificationToken);
  await sendEmail(send);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerify;
