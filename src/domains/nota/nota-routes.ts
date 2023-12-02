import { Hono } from 'hono';
import httpStatus from 'http-status-codes';

import { NotaController } from 'src/infra/server/controllers/nota-controller';

export function makeNotaRoutes() {
	const routes = new Hono();
	const notaController = new NotaController();

	routes.get('/', async c => {
		return c.json(await notaController.getAll(), httpStatus.OK);
	});

	routes.get('/:id', async c => {
		return c.json(await notaController.getById(c.req.param('id')), httpStatus.OK);
	});

	routes.post('/', async c => {
		return c.json(await notaController.create(await c.req.json()), httpStatus.CREATED);
	});

	routes.put('/:id', async c => {
		return c.json(await notaController.updateById(c.req.param('id'), await c.req.json()), httpStatus.OK);
	});

	routes.delete('/:id', async c => {
		return c.json(await notaController.deleteById(c.req.param('id')), httpStatus.OK);
	});

	return routes;
}
