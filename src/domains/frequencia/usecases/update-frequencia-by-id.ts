import { EventPublisherRepository } from 'src/domains/event-publisher/event-publisher-repository';
import { NewFrequencia, PersistedFrequencia } from 'src/domains/frequencia/frequencia';
import { FrequenciaRepository } from 'src/domains/frequencia/frequencia-repository';

type AutomaticModelAttributes = 'criadoEm' | 'atualizadoEm';

export class UpdateFrequenciaByIdUsecase {
	constructor(
		private frequenciaRepository: FrequenciaRepository,
		private eventPublisherRepository: EventPublisherRepository
	) {}

	async execute(id: string, frequencia: Omit<NewFrequencia, AutomaticModelAttributes>): Promise<PersistedFrequencia> {
		const existingFrequencia = await this.frequenciaRepository.getOneById(id);

		const updatedFrequencia = await this.frequenciaRepository.updateOneById(id, {
			...frequencia,
			id: existingFrequencia.id,
			criadoEm: existingFrequencia.criadoEm,
			atualizadoEm: new Date(),
		});

		this.eventPublisherRepository.send('update', 'frequencia', updatedFrequencia);

		return updatedFrequencia;
	}
}
