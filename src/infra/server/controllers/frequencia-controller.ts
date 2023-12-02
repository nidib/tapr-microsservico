import { z } from 'zod';

import { CreateFrequenciaUsecase } from 'src/domains/frequencia/usecases/create-frequencia';
import { DeleteFrequenciaByIdUsecase } from 'src/domains/frequencia/usecases/delete-frequencia-by-id';
import { GetAllFrequenciasUsecase } from 'src/domains/frequencia/usecases/get-all-frequencias';
import { GetFrequenciaByIdUsecase } from 'src/domains/frequencia/usecases/get-frequencia-by-id';
import { UpdateFrequenciaByIdUsecase } from 'src/domains/frequencia/usecases/update-frequencia-by-id';
import { FrequenciaCosmosRepository } from 'src/infra/cosmos/repositories/frequencia-cosmos-repository';

const createSchemas = {
	request: z.object({
		data: z.coerce.date(),
		presente: z.boolean(),
		justificado: z.boolean(),
		alunoId: z.string(),
		turmaId: z.string(),
	}),
	response: z.object({
		id: z.string(),
		data: z.string(),
		presente: z.boolean(),
		justificado: z.boolean(),
		alunoId: z.string(),
		turmaId: z.string(),
		atualizadoEm: z.string(),
	}),
};

export class FrequenciaController {
	private getAllFrequenciasUsecase: GetAllFrequenciasUsecase;
	private getFrequenciaByIdUsecase: GetFrequenciaByIdUsecase;
	private createFrequenciaUsecase: CreateFrequenciaUsecase;
	private updateFrequenciaByIdUsecase: UpdateFrequenciaByIdUsecase;
	private deleteFrequenciaByIdUsecase: DeleteFrequenciaByIdUsecase;

	constructor() {
		const frequenciaCosmosRepository = new FrequenciaCosmosRepository();

		this.getAllFrequenciasUsecase = new GetAllFrequenciasUsecase(frequenciaCosmosRepository);
		this.getFrequenciaByIdUsecase = new GetFrequenciaByIdUsecase(frequenciaCosmosRepository);
		this.createFrequenciaUsecase = new CreateFrequenciaUsecase(frequenciaCosmosRepository);
		this.updateFrequenciaByIdUsecase = new UpdateFrequenciaByIdUsecase(frequenciaCosmosRepository);
		this.deleteFrequenciaByIdUsecase = new DeleteFrequenciaByIdUsecase(frequenciaCosmosRepository);
	}

	async getAll() {
		const frequencias = await this.getAllFrequenciasUsecase.execute();

		return frequencias.map(freq => createSchemas.response.parse(freq));
	}

	async getById(id: string) {
		const existingFrequencia = await this.getFrequenciaByIdUsecase.execute(id);

		return createSchemas.response.parse(existingFrequencia);
	}

	async create<T>(body: T) {
		const newFrequenciaCandidate = createSchemas.request.parse(body);

		const created = await this.createFrequenciaUsecase.execute(newFrequenciaCandidate);

		return createSchemas.response.parse(created);
	}

	async updateById<T>(id: string, body: T) {
		const updatedFrequenciaCandidate = createSchemas.request.parse(body);

		const updated = await this.updateFrequenciaByIdUsecase.execute(id, updatedFrequenciaCandidate);

		return createSchemas.response.parse(updated);
	}

	async deleteById(id: string): Promise<null> {
		await this.deleteFrequenciaByIdUsecase.execute(id);

		return null;
	}
}
