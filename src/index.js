const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const session = require("express-session");

const { PORT } = require("./config").app;
const sessionConfig = require("./config").session;
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
