var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
    config = require('./config'),
    port = process.env.PORT || config.app.port;

app.use(express.static(__dirname + '/public'));

app.listen(port, function(){
    console.log('server is running...');
});