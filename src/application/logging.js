// src/application/logging.js
import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  // Ganti format.json() dengan kombinasi di bawah ini
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf((info) => {
      return `${info.timestamp} ${info.level}: ${info.message}`;
    })
  ),
  transports: [new winston.transports.Console({})],
});
