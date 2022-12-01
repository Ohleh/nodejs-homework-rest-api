const fs = require("fs/promises");
const path = require("path");

const { Users } = require("../../models/users");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
// const avatarsDir = path.resolve("../../public/avatars");

// const avatarsDir = path.resolve("../../public/avatars");

const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file; // дістаємо
    const resultUpload = path.join(avatarsDir, originalname); // створюємо шлях де він має зберігаьтися, до папки з аватарками з оріджинал нейм
    await fs.rename(tempUpload, resultUpload); // переміщуємо
    const avatarUrl = path.join("avatars", originalname); // пишемо новий шлях
    await Users.findByIdAndUpdate(_id, { avatarUrl }); // відпоавили відповідь, змінили шлях
    res.json({ avatarUrl });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
