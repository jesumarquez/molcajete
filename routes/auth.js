var express         = require('express'),
    router          = express.Router(),
    passport        = require('passport')
    authController  = require('../controllers/authController');

router.get('/', authController.login);
router.post('/', passport.authenticate('local-login', {
    successRedirect: '/', 
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/signup', authController.signup);
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/', 
    failureRedirect: '/login/signup',
    failureFlash: true
}));

module.exports = router;