var passport        = require('passport')
    authController  = {};

authController.login = function (req, res) {
    res.render('login');
};

authController.doLogin = function(req, res){
    passport.authenticate('local')(req, res, function() {
        res.redirect('/');
    });
} 

module.exports = authController;