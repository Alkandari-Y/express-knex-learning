const { StatusCodes } = require("http-status-codes");
module.exports = (err, req, res, next) => {
  return res
    .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: err.message || "Internal server error" });
};
