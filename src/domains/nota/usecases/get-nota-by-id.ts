import { PersistedNota } from 'src/domains/nota/nota';
import { NotaRepository } from 'src/domains/nota/nota-repository';

export class GetNotaByIdUsecase {
	constructor(private notaRepository: NotaRepository) {}

	async execute(id: string): Promise<PersistedNota> {
		return this.notaRepository.getOneById(id);
	}
}
