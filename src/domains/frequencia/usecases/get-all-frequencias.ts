import type { PersistedFrequencia } from 'src/domains/frequencia/frequencia';
import type { FrequenciaRepository } from 'src/domains/frequencia/frequencia-repository';

export class GetAllFrequenciasUsecase {
	constructor(private frequenciaRepository: FrequenciaRepository) {}

	async execute(): Promise<PersistedFrequencia[]> {
		return this.frequenciaRepository.getAll();
	}
}
