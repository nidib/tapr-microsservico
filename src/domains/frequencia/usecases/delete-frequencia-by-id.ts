import { EventPublisherRepository } from 'src/domains/event-publisher/event-publisher-repository';
import { FrequenciaRepository } from 'src/domains/frequencia/frequencia-repository';

export class DeleteFrequenciaByIdUsecase {
	constructor(
		private frequenciaRepository: FrequenciaRepository,
		private eventPublisherRepository: EventPublisherRepository
	) {}

	async execute(id: string): Promise<boolean> {
		const hasDeleted = await this.frequenciaRepository.deleteById(id);

		this.eventPublisherRepository.send('delete', 'frequencia', { id });

		return hasDeleted;
	}
}
