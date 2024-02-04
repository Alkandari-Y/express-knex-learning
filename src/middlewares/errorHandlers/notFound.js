const { StatusCodes } = require("http-status-codes");

module.exports = (req, res, next) => {
  return res.status(StatusCodes.NOT_FOUND).json({ message: "page not found" });
};
