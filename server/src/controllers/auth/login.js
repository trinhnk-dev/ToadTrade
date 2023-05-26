const jwt = require("jsonwebtoken");
const { checkPassword } = require("../../utils/passwordService");
const User = require("../../models/User");

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) return res.status(404).json("User not found!");
    if (!(await checkPassword(req.body.password, user.password))) {
      return res.status(400).json("Password is incorrect!");
    }
    const payload = {
      username: user.username,
      name: user.name,
      id: user.id,
      yoB: user.yoB,
      isAdmin: user.isAdmin,
    };
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "30m",
    });

    return res.status(200).json({
      status: 200,
      message: "Login successfully!",
      profile: { ...payload },
      accessToken: accessToken,
    });
  } catch (e) {
    res.status(500).json("Internal Server Error!");
    return next(e);
  }
};

module.exports = { login };
