var express         = require('express'),
    app             = express(),
    path            = require('path'),
    bodyParser      = require('body-parser'),
    cookieParser    = require('cookie-parser'),
    config          = require('./config'),
    appRoute        = require('./routes'),
    loginRoute      = require('./routes/auth'),
    session         = require('express-session'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy,
    port            = process.env.PORT || config.app.port;

//VIEWS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.basedir = app.get('views');

//STATIC
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'node_modules')));

//BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//PASSPORT
app.use(cookieParser());
app.use(session({ 
    secret: 'super secret cat!!!',
    resave: false,
    saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (username, password, done) {
        if(username == 'jesumarquez@gmail.com')
            return done(null, username);
        else
            return done(null, false, {message: 'user not found'});
    }
));
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (username, done) {
    done(null, username);
});

//ROUTES
app.use('/', appRoute);
app.use('/login', loginRoute);

//LISTEN
app.listen(port, function(){
    console.log('server is running...');
});