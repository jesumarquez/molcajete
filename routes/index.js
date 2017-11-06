var express         = require('express'),
    app             = express.Router(),
    homeController   = require('../controllers/homeController');
    authController   = require('../controllers/authController');

app.get('', homeController.home);

app.get('/about', authController.isAuthenticated(), homeController.about);

module.exports = app;