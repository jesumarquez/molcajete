var express = require('express'),
    passport = require('passport'),
    router = express.Router();

router.get('/', function (req, res) {
    res.render('login');
});

router.post('/', passport.authenticate('local'), function (req, res) {
    res.redirect('/');
});

module.exports = router;