var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var methodOverride = require ('method-override');
var logger = require('morgan');
var session = require('express-session');

// var logMiddleware = require('./middlewares/logMiddleware');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var apiUsersRouter = require('./routes/api/users')
var cartRouter = require('./routes/cart')
var productsRouter = require('./routes/products');
var apiProductsRouter = require('./routes/api/products')
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var pruebalecturadbRouter = require('./routes/pruebalecturadb');
var contactRouter = require('./routes/contact');
var recordameMiddleware = require('./middlewares/recordameMiddleware')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({secret:"Mensaje secreto"}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/cart', cartRouter);
app.use('/products', productsRouter);
app.use('/api/products', apiProductsRouter);
app.use('/api/users', apiUsersRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/pruebalecturadb', pruebalecturadbRouter);

app.use('/contact', contactRouter);

app.use(recordameMiddleware);

//app.use('/users/admin', usersRouter)


// catch 404 and forward to error handler
app.use((req,res,next) => { res.status(404).redirect('/')})
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

module.exports = app;

