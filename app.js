import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import apiRouter from './routes/api/index.js';
import apiLoanApplicationRouter from './routes/api/loan_application.js';

const __dirname = path.resolve();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/health-check', (req, res) => res.sendStatus(200));
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/api/loan_application/', apiLoanApplicationRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  const routes = app._router.stack;
  console.log(routes);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.routes = routes.map((o) => (o.route ? o.route.path : o.name));

  // render the error page
  res.status(err.status || 500);
  res.render('error'); // no error handling view
});

export default app;
