const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const session = require("express-session");

const { session: sessionConfig } = require("./config");
const apiRoutes = require("./api/routes");
const notFound = require("./middlewares/errorHandlers/notFound");
const errorHandler = require("./middlewares/errorHandlers/errorHandler");
const redisStore = require("./redisStore");

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    ...sessionConfig,
    store: redisStore,
  })
);

app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
