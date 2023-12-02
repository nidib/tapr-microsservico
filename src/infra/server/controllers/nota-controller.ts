import { z } from 'zod';

import { CreateNotaUsecase } from 'src/domains/nota/usecases/create-nota';
import { DeleteNotaByIdUsecase } from 'src/domains/nota/usecases/delete-nota-by-id';
import { GetAllNotasUsecase } from 'src/domains/nota/usecases/get-all-notas';
import { GetNotaByIdUsecase } from 'src/domains/nota/usecases/get-nota-by-id';
import { UpdateNotaByIdUsecase } from 'src/domains/nota/usecases/update-nota-by-id';
import { NotaCosmosRepository } from 'src/infra/cosmos/repositories/nota-cosmos-repository';

const createSchemas = {
	request: z.object({
		titulo: z.string(),
		descricao: z.string().optional(),
		nota: z.coerce.number().min(0).max(10),
		peso: z.coerce.number().int().positive().max(10),
		alunoId: z.string(),
		turmaId: z.string(),
	}),
	response: z.object({
		id: z.string(),
		titulo: z.string(),
		descricao: z.string().optional(),
		nota: z.number(),
		peso: z.number(),
		alunoId: z.string(),
		turmaId: z.string(),
		atualizadoEm: z.string(),
	}),
};

export class NotaController {
	private getAllNotasUsecase: GetAllNotasUsecase;
	private getNotaByIdUsecase: GetNotaByIdUsecase;
	private createNotaUsecase: CreateNotaUsecase;
	private updateNotaByIdUsecase: UpdateNotaByIdUsecase;
	private deleteNotaByIdUsecase: DeleteNotaByIdUsecase;

	constructor() {
		const notaCosmosRepository = new NotaCosmosRepository();

		this.getAllNotasUsecase = new GetAllNotasUsecase(notaCosmosRepository);
		this.getNotaByIdUsecase = new GetNotaByIdUsecase(notaCosmosRepository);
		this.createNotaUsecase = new CreateNotaUsecase(notaCosmosRepository);
		this.updateNotaByIdUsecase = new UpdateNotaByIdUsecase(notaCosmosRepository);
		this.deleteNotaByIdUsecase = new DeleteNotaByIdUsecase(notaCosmosRepository);
	}

	async getAll() {
		const notas = await this.getAllNotasUsecase.execute();

		return notas.map(freq => createSchemas.response.parse(freq));
	}

	async getById(id: string) {
		const existingNota = await this.getNotaByIdUsecase.execute(id);

		return createSchemas.response.parse(existingNota);
	}

	async create<T>(body: T) {
		const newNotaCandidate = createSchemas.request.parse(body);
		const created = await this.createNotaUsecase.execute(newNotaCandidate);

		return createSchemas.response.parse(created);
	}

	async updateById<T>(id: string, body: T) {
		const updatedNotaCandidate = createSchemas.request.parse(body);
		const updated = await this.updateNotaByIdUsecase.execute(id, updatedNotaCandidate);

		return createSchemas.response.parse(updated);
	}

	async deleteById(id: string) {
		await this.deleteNotaByIdUsecase.execute(id);

		return null;
	}
}
