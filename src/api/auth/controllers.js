const { StatusCodes } = require("http-status-codes");
const UserService = require("../../services/userService");

exports.registerUserJWT = async (req, res, next) => {
  try {
    const user = await UserService.createUser(req.body);
    const tokens = UserService.generateUserTokens(user);
    res.status(StatusCodes.CREATED).json(tokens);
  } catch (error) {
    return next(error);
  }
};

exports.loginUserJWT = async (req, res, next) => {
  try {
    const user = await UserService.loginUser(req.body);
    const tokens = UserService.generateUserTokens(user);
    res.json(tokens);
  } catch (error) {
    return next(error);
  }
};

exports.registerUserSession = async (req, res, next) => {
  try {
    const user = await UserService.createUser(req.body);
    req.session.authenticated = true;
    req.session.user = user;

    res.sendStatus(StatusCodes.CREATED);
  } catch (error) {
    return next(error);
  }
};

exports.loginUserSession = async (req, res, next) => {
  try {
    const user = await UserService.loginUser(req.body);
    req.session.authenticated = true;
    req.session.user = user;

    res.sendStatus(StatusCodes.OK);
  } catch (error) {
    return next(error);
  }
};
