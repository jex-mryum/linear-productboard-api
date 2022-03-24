import { createLogger, format, transports } from 'winston';
import { cwd } from 'process';

const logFormat = format.printf(info => `${info.level} ${info.timestamp}\n${info.message}\n`);

export const logger = createLogger({
  level: `info`,
  format: format.combine(format.timestamp(), format.json(), format.label({ label: cwd(), message: true })),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    }),
  ],
});
