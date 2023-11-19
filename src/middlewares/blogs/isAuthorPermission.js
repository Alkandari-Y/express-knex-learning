module.exports = (req, res, next) => {
  // This permission will work with either JWT or sessions
  const user = req.session.user || req.user;
  if (req.blog.author_id !== user.id) {
    return next({ status: 403, message: "Cannot modify this resource" });
  }
  return next();
};
