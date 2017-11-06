var passport        = require('passport')
    authController  = {};

authController.login = function (req, res) {
    res.render('auth/login', { message: req.flash('loginMessage') });
};

authController.isAuthenticated = function () {
  return function (req, res, next) {
      if(req.isAuthenticated()){
          return next();
      }
      res.redirect('/login');
  }  
};

module.exports = authController;