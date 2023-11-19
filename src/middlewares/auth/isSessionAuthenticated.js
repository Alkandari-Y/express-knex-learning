module.exports = (req, res, next) => {
  if (!req.session.authenticated) {
    return next({
      status: 403,
      message: "Not authenticated",
      details: ["Not authenticated via session"],
    });
  }
  return next();
};
