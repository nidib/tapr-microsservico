import { EventPublisherRepository } from 'src/domains/event-publisher/event-publisher-repository';
import { NewFrequencia, PersistedFrequencia, validateNewFrequencia } from 'src/domains/frequencia/frequencia';
import { FrequenciaRepository } from 'src/domains/frequencia/frequencia-repository';

type AutomaticModelAttributes = 'criadoEm' | 'atualizadoEm';

export class CreateFrequenciaUsecase {
	constructor(
		private frequenciaRepository: FrequenciaRepository,
		private eventPublisherRepository: EventPublisherRepository
	) {}

	async execute(frequencia: Omit<NewFrequencia, AutomaticModelAttributes>): Promise<null | PersistedFrequencia> {
		const newFrequencia: NewFrequencia = {
			...frequencia,
			criadoEm: new Date(),
			atualizadoEm: new Date(),
		};
		const validatedFrequencia = validateNewFrequencia(newFrequencia);

		const createdFrequencia = await this.frequenciaRepository.createOne(validatedFrequencia);

		if (createdFrequencia) {
			this.eventPublisherRepository.send('create', 'frequencia', createdFrequencia);
		}

		return createdFrequencia;
	}
}
