const winston = require('winston');
require("dotenv").config();

const logFormat = winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.json()
);

const loggerTransports = [];

const consoleTransport = new winston.transports.File({
    filename: 'server-info.log',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
    level: "debug",
});
loggerTransports.push(consoleTransport);


const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: logFormat,
    transports: loggerTransports,
});

module.exports = logger;