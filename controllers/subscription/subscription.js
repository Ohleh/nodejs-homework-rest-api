const { Users } = require("../../models/users");

const subscription = async (req, res) => {
  try {
    // const { subscription } = req.user;
    const updateSubscription = await Users.findOneAndUpdate({}, req.body, {
      new: true,
    });
    //
    res.json({ updateSubscription });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = subscription;
