const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const session = require("express-session");

// const { PORT } = require("./config").app;
// const sessionConfig = require("./config").session;
// Below is a one liner to achieve the above with destructuring and renaming and nested destructuring to avoid variable name collisions
const { session: sessionConfig, app: { PORT } } = require('./config')
const apiRoutes = require("./api/routes");
const notFound = require("./middlewares/errorHandlers/notFound");
const errorHandler = require("./middlewares/errorHandlers/errorHandler");

const app = express();

app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sessionConfig));

app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
