import { NewFrequencia, PersistedFrequencia, validateNewFrequencia } from 'src/domains/frequencia/frequencia';
import { FrequenciaRepository } from 'src/domains/frequencia/frequencia-repository';

type AutomaticModelAttributes = 'criadoEm' | 'atualizadoEm';

export class DeleteFrequenciaByIdUsecase {
	constructor(private frequenciaRepository: FrequenciaRepository) {}

	async execute(id: string): Promise<boolean> {
		return this.frequenciaRepository.deleteById(id);
	}
}
