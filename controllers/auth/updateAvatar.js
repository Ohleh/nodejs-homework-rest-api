const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { Users } = require("../../models/users");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { _id, email } = req.user;
    const { path: tempUpload, originalname } = req.file; // дістаємо

    const extention = originalname.split(".").pop();
    const nameEmail = email.split("@", 1);
    const fileName = `${nameEmail}-${_id}.${extention}`;
    const resultUpload = path.join(avatarsDir, fileName); // створюємо шлях де він має зберігаьтися, до папки з аватарками з оріджинал нейм

    await fs.rename(tempUpload, resultUpload); // переміщуємо

    // async function resize() {
    const image = await Jimp.read(resultUpload);
    image.resize(250, 250);
    image.write(resultUpload);
    // }
    // resize();

    const avatarURL = path.join("avatars", fileName); // пишемо новий шлях // "avatars" без public бо вже вказана app.use(express.static("public"));
    await Users.findByIdAndUpdate(_id, { avatarURL }); // відпоавили відповідь, змінили шлях

    res.json({ avatarURL });
  } catch (error) {
    // якщо папка avatars випадково перейменована, то трапиться помилка, а в tmp застрагне файл,
    // тому видалємо файл з тимчасової папки
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
