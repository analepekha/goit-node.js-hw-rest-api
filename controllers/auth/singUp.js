const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const gravatar = require("gravatar");

const singUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, password, avatarURL });
  newUser.setPassword(password);
  newUser.save();
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
      },
    },
  });
};

module.exports = singUp;
