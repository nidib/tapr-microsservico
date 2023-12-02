import { serve } from '@hono/node-server';
import type { Options, ServerType } from '@hono/node-server/dist/types';
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
	const app: Options = {
		hostname: '0.0.0.0',
		port: 8080,
		fetch: makeApp().fetch,
	};

	let server = serve(app, options => {
		logger.info(`Server listening at http://${options.address}:${options.port}`);
	});

	gracefulShutdown(server);
}

main();
