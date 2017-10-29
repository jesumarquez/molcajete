var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser');
    config = require('./config'),
    port = process.env.PORT || config.app.port;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.get('/', function(req, res){
    res.render('index');
});
app.get('/about', function(req, res){
    res.render('about');
});

app.listen(port, function(){
    console.log('server is running...');
});