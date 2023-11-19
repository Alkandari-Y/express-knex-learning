const jwt = require("jsonwebtoken");
const { JWT_ACCESS_EXP, JWT_REFRESH_EXP, JWT_SECRET } =
  require("../../config").jwt;

module.exports = (user, tokenType = "access") => {
  const payload = {
    id: user.id,
    type: tokenType,
  };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: tokenType === "access" ? JWT_ACCESS_EXP : JWT_REFRESH_EXP,
  });

  return token;
};
