import { createLogger, format, transports } from 'winston';

const logFormat = format.printf(info => `${info.timestamp} ${info.level}:\n${info.message}\n`);

export const logger = createLogger({
  level: `info`,
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    }),
  ],
});
