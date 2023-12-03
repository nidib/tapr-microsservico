import { EventPublisherRepository } from 'src/domains/event-publisher/event-publisher-repository';
import { NewNota, PersistedNota, validateNewNota } from 'src/domains/nota/nota';
import { NotaRepository } from 'src/domains/nota/nota-repository';

type AutomaticModelAttributes = 'criadoEm' | 'atualizadoEm';

export class CreateNotaUsecase {
	constructor(
		private notaRepository: NotaRepository,
		private eventPublisherRepository: EventPublisherRepository
	) {}

	async execute(nota: Omit<NewNota, AutomaticModelAttributes>): Promise<null | PersistedNota> {
		const newNota: NewNota = {
			...nota,
			criadoEm: new Date(),
			atualizadoEm: new Date(),
		};
		const validatedNota = validateNewNota(newNota);

		const createdNota = await this.notaRepository.createOne(validatedNota);

		if (createdNota) {
			this.eventPublisherRepository.send('create', 'nota', createdNota);
		}

		return createdNota;
	}
}
