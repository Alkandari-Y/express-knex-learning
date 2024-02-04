const redis = require("redis");
const {
  redis: { host, port, username, password },
} = require("./config");

const client = redis.createClient({
  url: `redis://${username}:${password}@${host}:${port}`,
});

module.exports = client;
