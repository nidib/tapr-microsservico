import { EventPublisherRepository } from 'src/domains/event-publisher/event-publisher-repository';
import { NotaRepository } from 'src/domains/nota/nota-repository';

export class DeleteNotaByIdUsecase {
	constructor(
		private notaRepository: NotaRepository,
		private eventPublisherRepository: EventPublisherRepository
	) {}

	async execute(id: string): Promise<boolean> {
		const hasDeleted = await this.notaRepository.deleteById(id);

		this.eventPublisherRepository.send('delete', 'nota', { id });

		return hasDeleted;
	}
}
