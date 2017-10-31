var express         = require('express'),
    app             = express.Router(),
    homeControler   = require('../controllers/homeController');

app.get('', homeControler.home);

app.get('/about', homeControler.about);

module.exports = app;