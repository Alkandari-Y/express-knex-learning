module.exports = (req, user) => {
  req.session.authenticated = true;
  req.session.user = {
    id: user.id,
    username: user.username,
    email: user.email,
  };
};
