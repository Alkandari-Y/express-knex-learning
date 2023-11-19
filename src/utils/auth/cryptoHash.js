require("dotenv").config();

const crypto = require("node:crypto");
const salt = process.env.SALT;

const cryptoHashPassword = (password) => {
  const hashedPassword = crypto
    .createHash("sha256", salt)
    .update(password)
    .digest("hex");
  return hashedPassword;
};

const compareCryptoPassHash = (inputPass, storedHash) => {
  const passToCompare = cryptoHashPassword(inputPass);
  return passToCompare === storedHash;
};

module.exports = { cryptoHashPassword, compareCryptoPassHash };
