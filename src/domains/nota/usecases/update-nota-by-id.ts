import { NewNota, PersistedNota } from 'src/domains/nota/nota';
import { NotaRepository } from 'src/domains/nota/nota-repository';

type AutomaticModelAttributes = 'criadoEm' | 'atualizadoEm';

export class UpdateNotaByIdUsecase {
	constructor(private notaRepository: NotaRepository) {}

	async execute(id: string, nota: Omit<NewNota, AutomaticModelAttributes>): Promise<PersistedNota> {
		const existingNota = await this.notaRepository.getOneById(id);

		return this.notaRepository.updateOneById(id, {
			...nota,
			id: existingNota.id,
			criadoEm: existingNota.criadoEm,
			atualizadoEm: new Date(),
		});
	}
}
