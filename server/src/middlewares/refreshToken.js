const jwt = require("jsonwebtoken");

const refreshToken = async (req, res, next) => {
  const { refreshToken } = {
    ...req.params,
    ...req.query,
    ...req.body,
  };
  try {
    const payload = jwt.verify(
      refreshToken || req.headers.refresh_token,
      process.env.SECRET_KEY
    );
    if (payload.refreshToken && payload.isAdmin) {
      const newPayload = pick(payload);
      const newAccessToken = jwt.sign(newPayload, process.env.SECRET_KEY, {
        expiresIn: "30m",
      });
      const newRefreshToken = jwt.sign(
        {
          ...newPayload,
          refreshToken: true,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      return res.status(200).json({
        ...payload,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    }
    return res.status(401).json({
      message: "You are Not authorized.",
    });
  } catch (e) {
    return res.status(401).json({
      message: "You are Not authorized.",
    });
  }
};
