const  createError = require('http-errors');
const  express = require('express');
const mongoose = require('mongoose');
const  path = require('path');
const  cookieParser = require('cookie-parser');
const  dotenv = require('dotenv');
const  logger = require('morgan');
dotenv.config()

const  indexRouter = require('./routes/index');
const  usersRouter = require('./routes/users');
const  productsRouter = require('./routes/products');

const  app = express();

// mo ket noi vao mongodb

dotenv.config()
const URI =`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.75lvyhp.mongodb.net/mydemo?retryWrites=true&w=majority&ssl=true`
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=> {
    console.log('Kết nối database thành công');
  })
  .catch((error)=> {
    console.log('Kết nối database thất bại');
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productsRouter);

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
