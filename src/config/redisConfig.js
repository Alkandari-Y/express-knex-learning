require("dotenv").config();

const { REDIS_HOST, REDIS_PORT, REDIS_PREFIX, REDIS_USERNAME, REDIS_PASSWORD } =
  process.env;

module.exports = {
  host: REDIS_HOST || "0.0.0.0",
  port: REDIS_PORT || 6379, // default port
  prefix: REDIS_PREFIX,
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
};
