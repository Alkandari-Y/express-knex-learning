const { StatusCodes } = require("http-status-codes");
module.exports = (req, res, next) => {
  if (!req.session.authenticated) {
    return next({
      status: StatusCodes.UNAUTHORIZED,
      message: "Not authenticated",
      details: ["Not authenticated via session"],
    });
  }
  return next();
};
