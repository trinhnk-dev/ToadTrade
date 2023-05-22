const jwt = require("jsonwebtoken");
const Admin = require("../models/User");

const validateAdmin = async (req, res, next) => {
  const accessToken = req.headers.access_token;
  if (!accessToken) {
    return res
      .status(400)
      .json({ errorState: 400, errorMessage: "AccessToken wrong!" });
  }
  try {
    const payload = await jwt.verify(accessToken, process.env.SECRET_KEY);

    if (payload.email || payload === undefined) {
      const admin = await Admin.findOne({ email: payload.email });
      if (!admin.isAdmin) {
        return res.status(403).json({ message: "You are not authorized!" });
      }
      truen;
    }
    return next();
  } catch (e) {
    return res.status(500).json({ status: 500, message: "Internal Server Error!" });
  }
};

module.exports = { validateAdmin };
