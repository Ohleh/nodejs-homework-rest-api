const { Users } = require("../../models/users");

const { RequestError } = require("../../helpers");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await Users.findOne({ verificationToken });
  if (!user) {
    throw RequestError(404, "User not found");
  }
  await Users.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.json({
    status: 200,
    message: "Verification successful",
  });
};

module.exports = verify;
