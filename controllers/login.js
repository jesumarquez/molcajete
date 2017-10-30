var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    res.render('login');
});

router.post('/', function (req, res) {
    console.log(req.body.email);
    res.render('login');
});

module.exports = router;