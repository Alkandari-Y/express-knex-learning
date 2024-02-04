const RedisStore = require("connect-redis").default;

const redisClient = require("./redisClient");

redisClient.connect();
let redisStore = new RedisStore({
  client: redisClient,
  logErrors: true,
});

module.exports = redisStore;
