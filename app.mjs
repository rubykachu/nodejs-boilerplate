/**
 * Required External Modules
 */
import createError from 'http-errors';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import logger from './config/logger.mjs';
import userRouter from './config/routes/user.mjs';
import adminRouter from './config/routes/admin.mjs';

/**
 *  App Configuration
 */
const app = express();
app.use(compression()); // Use gzip/deflate compression for responses
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 *  Setting view engine and static files
 */
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
app.set('views', path.join(dirname, 'app/views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(dirname, 'app/assets')));

/**
 * Routes Definitions
 */
app.use(logger); // write stream log
app.use('/', userRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(400));
});

// error handler
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
