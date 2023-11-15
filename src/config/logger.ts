import { createLogger, format, transports } from 'winston';

function makeLogger() {
	const logger = createLogger({
		level: 'info',
		format: format.combine(format.timestamp(), format.simple(), format.colorize()),
		transports: [
			new transports.File({ dirname: './.logs', filename: 'errors.log', level: 'error' }),
			new transports.File({ dirname: './.logs', filename: 'general.log' }),
		],
	});

	if (process.env.NODE_ENV !== 'production') {
		logger.add(new transports.Console());
	}

	return logger;
}

export const logger = makeLogger();
