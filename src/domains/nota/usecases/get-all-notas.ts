import type { PersistedNota } from 'src/domains/nota/nota';
import type { NotaRepository } from 'src/domains/nota/nota-repository';

export class GetAllNotasUsecase {
	constructor(private notaRepository: NotaRepository) {}

	async execute(): Promise<PersistedNota[]> {
		return this.notaRepository.getAll();
	}
}
