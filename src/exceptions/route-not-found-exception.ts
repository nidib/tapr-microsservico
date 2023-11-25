import { ApiException } from 'src/exceptions/_api-exception';

export class RouteNotFoundException extends ApiException {
	constructor() {
		super('Rota não encontrada', 404);
	}
}
