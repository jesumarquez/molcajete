var express         = require('express'),
    router          = express.Router(),
    passport        = require('passport')
    authController  = require('../controllers/authController');

router.get('/', authController.login);

router.post('/', passport.authenticate('local', {
    successRedirect: '/', 
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;