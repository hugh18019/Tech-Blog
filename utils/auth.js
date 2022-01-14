const withAuth = (req, res, next) => {
  // If the user isn't logged in, redirect them to the login route
  console.log("req.session", req.session);

  res.locals.sess = req.session;

  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
