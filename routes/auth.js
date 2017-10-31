var express         = require('express'),
    router          = express.Router(),
    authController  = require('../controllers/authController');

router.get('/', authController.login);

router.post('/', authController.doLogin);

module.exports = router;