const { Users } = require("../../models/users");

const uploadAvatar = async (req, res) => {
  try {
    // const updateSubscription = await Users.findOneAndUpdate({}, req.body, {
    //   new: true,
    // });
    //
    res.json({ status: "success" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = uploadAvatar;
