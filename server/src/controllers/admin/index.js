const User = require("../../models/User");
const { hashPassword } = require("../../utils/passwordService");

const removeAdmin = async (req, res, next) => {
  const userId = req.body._id;
  try {
    const userInfo = await User.findByIdAndUpdate(userId, { isAdmin: false });
    if (!userInfo)
      return res
        .status(400)
        .json({ errorStatus: 400, errorMessage: "Cannot update User!" });
    res.status(200).json({ state: 200, message: "Update successfully!" });
  } catch (e) {
    res
      .status(500)
      .json({ errorStatus: 500, errorMessage: "Internal Server Error! " });
    next(e);
  }
};
module.exports = { removeAdmin };
