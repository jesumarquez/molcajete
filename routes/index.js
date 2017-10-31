var express         = require('express'),
    app             = express.Router(),
    homeControler   = require('../controllers/homeController');
    authControler   = require('../controllers/authController');

app.get('', homeControler.home);

app.get('/about', authControler.isAuthenticated(), homeControler.about);

module.exports = app;