import { PersistedFrequencia } from 'src/domains/frequencia/frequencia';
import { FrequenciaRepository } from 'src/domains/frequencia/frequencia-repository';

export class GetFrequenciaByIdUsecase {
	constructor(private frequenciaRepository: FrequenciaRepository) {}

	async execute(id: string): Promise<PersistedFrequencia> {
		return this.frequenciaRepository.getOneById(id);
	}
}
