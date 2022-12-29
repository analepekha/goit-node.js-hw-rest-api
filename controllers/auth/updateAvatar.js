const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const avatarDir = path.join(__dirname, "../..", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { path: tempUpload, filename } = req.file;
    const { _id } = req.user;

    const image = await Jimp.read(`${tempUpload}`);
    image.resize(250, 250).write(tempUpload);

    const [extention] = filename.split(".").reverse();
    const avatarName = `${_id}.${extention}`;
    const resultUpload = path.join(avatarDir, avatarName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", resultUpload);
    const result = await User.findByIdAndUpdate(_id, { avatarURL });
    if (!result) {
      throw RequestError(401, "Not authorized");
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
