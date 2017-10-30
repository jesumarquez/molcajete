var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser');
    config = require('./config'),
    appRoute = require('./controllers/app'),
    loginRoute = require('./controllers/login'),
    port = process.env.PORT || config.app.port;

//VIEWS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//STATIC
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'node_modules')));

//BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTES
app.use('/', appRoute);
app.use('/login', loginRoute);

//LISTEN
app.listen(port, function(){
    console.log('server is running...');
});