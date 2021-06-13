var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
var session = require('express-session');

var proyectosRouter = require('./routes/proyectos');
var tareasRouter = require('./routes/tareas');
var usuariosRouter = require('./routes/usuarios');
var passport = require('./config/passport');
require('dotenv').config({path: 'process.env'});

var app = express();
//Requerimos el archivo helpers
var helpers = require('./helpers');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Agregamos flash messagges
app.use(flash());

app.use(session({
  secret: 'Ultrasecreto',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



//implementamos el helpers como un middleware de aplicación
app.use((req, res, next) =>{
  res.locals.vardump = helpers.vardump;
  res.locals.mensajes = req.flash();
  res.locals.usuario = {...req.user} || null;
  next();
})

app.use('/', proyectosRouter);
app.use('/tareas', tareasRouter);
app.use('/usuarios', usuariosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
