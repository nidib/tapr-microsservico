import { ApiException } from 'src/exceptions/_api-exception';

export class EntityNotFoundException extends ApiException {
	constructor() {
		super('Entidade não encontrada', 404);
	}
}
