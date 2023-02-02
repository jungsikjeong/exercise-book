module.exports = function isLogin(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.render('index.ejs');
  }
};
