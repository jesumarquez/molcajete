var passport        = require('passport')
    authController  = {};

authController.login = function (req, res) {
    res.render('auth/login');
};

authController.doLogin = function(req, res){
    passport.authenticate('local', { failureRedirect: '/login' })(req, res, function() {
        res.redirect('/');
    });
} 

authController.isAuthenticated = function () {
  return function (req, res, next) {
      if(req.isAuthenticated()){
          return next();
      }
      res.redirect('/login');
  }  
};

module.exports = authController;