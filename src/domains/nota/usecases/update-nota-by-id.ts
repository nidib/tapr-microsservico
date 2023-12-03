import { EventPublisherRepository } from 'src/domains/event-publisher/event-publisher-repository';
import { NewNota, PersistedNota } from 'src/domains/nota/nota';
import { NotaRepository } from 'src/domains/nota/nota-repository';

type AutomaticModelAttributes = 'criadoEm' | 'atualizadoEm';

export class UpdateNotaByIdUsecase {
	constructor(
		private notaRepository: NotaRepository,
		private eventPublisherRepository: EventPublisherRepository
	) {}

	async execute(id: string, nota: Omit<NewNota, AutomaticModelAttributes>): Promise<PersistedNota> {
		const existingNota = await this.notaRepository.getOneById(id);

		const updatedNota = await this.notaRepository.updateOneById(id, {
			...nota,
			id: existingNota.id,
			criadoEm: existingNota.criadoEm,
			atualizadoEm: new Date(),
		});

		this.eventPublisherRepository.send('update', 'nota', updatedNota);

		return updatedNota;
	}
}
