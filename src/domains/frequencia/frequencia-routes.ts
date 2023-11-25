import { Hono } from 'hono';
import httpStatus from 'http-status-codes';

import { FrequenciaController } from 'src/infra/server/controllers/frequencia-controller';

export function makeFrequenciaRoutes() {
	const routes = new Hono();
	const frequenciaController = new FrequenciaController();

	routes.get('/', async c => {
		return c.json(await frequenciaController.getAll(), httpStatus.OK);
	});

	routes.get('/:id', async c => {
		return c.json(await frequenciaController.getById(c.req.param('id')), httpStatus.OK);
	});

	routes.post('/', async c => {
		return c.json(await frequenciaController.create(await c.req.json()), httpStatus.CREATED);
	});

	routes.put('/:id', async c => {
		return c.json(await frequenciaController.updateById(c.req.param('id'), await c.req.json()), httpStatus.OK);
	});

	routes.delete('/:id', async c => {
		return c.json(await frequenciaController.deleteById(c.req.param('id')), httpStatus.OK);
	});

	return routes;
}
