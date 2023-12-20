const winston = require('winston');
const path = require('path');

const logFilePath = path.join(__dirname, '../Logs/application.log');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint(),
  ),
  transports: [
    new winston.transports.File({ filename: logFilePath}),
    // Add a console transport if you want to see pretty-printed logs in the console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

module.exports = logger;
