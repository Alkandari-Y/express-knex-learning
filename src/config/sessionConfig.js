require("dotenv").config();

// const { MemoryStore } = require("express-session");
// const store = new MemoryStore();

module.exports = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: "none", // to allow for cors and browsers to use the cookie
  },
  // store, // uses the above in memory store, commented to use redis
};
