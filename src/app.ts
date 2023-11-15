import { Hono } from 'hono';

export function makeApp() {
	const app = new Hono();

	app.get('/', c => c.json({ henlo: 'wold' }));

	return app;
}
