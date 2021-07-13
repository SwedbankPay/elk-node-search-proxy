import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import { createEngine } from 'express-react-views';
import { search } from './routes/search.js';

const app = express();

// view engine setup
app.set('view engine', 'jsx');
app.engine('jsx', createEngine());

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "design.swedbankpay.com fonts.googleapis.com"],
      fontSrc: ["'self'", "https: data:"],
      scriptSrc: ["'self'", "design.swedbankpay.com"]
    }
  })
);
app.use(compression())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), 'public')));
app.use('/', search);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  console.error(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
