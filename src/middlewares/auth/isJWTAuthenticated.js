// Not really implemented in the project
// can modify/create middleware to check for auth User using both
// sessions or jwt
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { JWT_SECRET } = require("../../config").jwt;

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return next({ status: 400, message: "No auth headers" });
    }

    const encodedToken = authHeader.split(" ")[1];
    // verify will check for both exp and if token matches signature
    return jwt.verify(encodedToken, JWT_SECRET, async (err, token) => {
      // using this method to specify the status on the error and be more explicit when handling decoding
      if (err) {
        err.status = StatusCodes.UNAUTHORIZED;
        return next(err);
      }

      const user = await User.findOne({ id: token.id });
      if (!user) {
        return next({
          status: StatusCodes.UNAUTHORIZED,
          message: "Invalid token",
          details: ["invalid user"],
        });
      }

      req.user = user;
      return next();
    });
  } catch (error) {
    return next(error);
  }
};
