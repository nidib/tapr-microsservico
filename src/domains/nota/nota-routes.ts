import { Hono } from 'hono';

export function makeNotaRoutes() {
	const routes = new Hono();

	routes.get('/', c => {
		return c.json({ nota: true });
	});

	return routes;
}
