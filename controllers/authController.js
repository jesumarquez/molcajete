var passport        = require('passport'),
    user            = require('../models/user'),
    authController  = {};

authController.login = function (req, res) {
    res.render('auth/login', { message: req.flash('loginMessage') });
};

authController.signup = function (req, res) {
    res.render('auth/signup', { message: req.flash('signupMessage') });
};

authController.isAuthenticated = function () {
  return function (req, res, next) {
      if(req.isAuthenticated()){
          return next();
      }
      res.redirect('/login');
  };  
};

module.exports = authController;