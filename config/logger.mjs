import loggerHTTP from 'morgan';

// Setting logs for morgan
// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });
// app.use(loggerHTTP('combined', { stream: accessLogStream }));

import winston from 'winston';

const winstonLogger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/development.log',
      level: 'debug',
    }),
  ],
});

const logger = loggerHTTP(
  // ':method :url :status :res[content-length] - :response-time ms',
  (tokens, req, res) => JSON.stringify({
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: Number.parseFloat(tokens.status(req, res)),
    content_length: tokens.res(req, res, 'content-length'),
    response_time: `${Number.parseFloat(
      tokens['response-time'](req, res),
    )} ms`,
  }),
  {
    stream: {
      // Configure Morgan to use our custom logger with the http severity
      write: (message) => {
        const data = JSON.parse(message);
        winstonLogger.http('incoming-request', data);

        // logger.http(message.trim())
      },
    },
  },
);

export default logger;
