var express         = require('express'),
    app             = express(),
    path            = require('path'),
    bodyParser      = require('body-parser'),
    cookieParser    = require('cookie-parser'),
    config          = require('./config'),
    appRoute        = require('./routes'),
    authRoute       = require('./routes/auth'),
    session         = require('express-session'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy,
    User            = require('./models/user'),
    flash           = require('connect-flash'),
    bcrypt          = require('bcrypt')
    port            = process.env.PORT || config.app.port;

//VIEWS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.basedir = app.get('views');

//STATIC
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));

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
app.use(flash());
passport.use('local-login',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, username, password, done) {
        User.findById(username, function(user){
            if(!user) {
                return done(null, false, req.flash('loginMessage', 'User not found'));
            }

            if(!bcrypt.compareSync(password, user.password)){
                return done(null, false, req.flash('loginMessage','Incorrect password.'));                
            }

            return done(null, user);
        });
    }
));
passport.use('local-signup',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, username, password, done) {
        User.findById(username, function(user){
            if(user) {
                return done(null, false, req.flash('signupMessage', 'User already exist!'));
            }

            User.create(username, bcrypt.hashSync(password, 7), req.body.fullName, 
                function(newUser){
                    if(newUser)
                        return done(null, newUser);
                    else
                        return done(null, false, req.flash('signupMessage','Error al crear el usuario.'));                
            });
        });
    }
));
passport.serializeUser(function (user, done) {
    done(null, user.username);
});
passport.deserializeUser(function (username, done) {
    User.findById(username, function(user) {
        done(null, user);
    });    
});

app.use(function(req, res, next){
    res.locals.authenticated = req.isAuthenticated();
    next();
});

//ROUTES
app.use('/', appRoute);
app.use('/login', authRoute);

//LISTEN
app.listen(port, function(){
    console.log('server is running on http://localhost:' +  port);
});