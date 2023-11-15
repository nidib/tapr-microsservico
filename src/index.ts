import { serve } from '@hono/node-server';
import { ServerType } from '@hono/node-server/dist/types';
import prexit from 'prexit';

import { makeApp } from 'src/app';
import { logger } from 'src/config/logger';

function gracefulShutdown(server: ServerType) {
	prexit((signal, code, error) => {
		logger.log({ level: 'info', message: `${signal}, ${code}, ${error}` });

		server.close();
	});
}

function main() {
	const app = makeApp();

	let server = serve(app, options => {
		logger.info(`Server listening at http://${options.address}:${options.port}`);
	});

	gracefulShutdown(server);
}

main();
