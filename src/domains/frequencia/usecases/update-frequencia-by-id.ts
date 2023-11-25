import { NewFrequencia, PersistedFrequencia } from 'src/domains/frequencia/frequencia';
import { FrequenciaRepository } from 'src/domains/frequencia/frequencia-repository';

type AutomaticModelAttributes = 'criadoEm' | 'atualizadoEm';

export class UpdateFrequenciaByIdUsecase {
	constructor(private frequenciaRepository: FrequenciaRepository) {}

	async execute(id: string, frequencia: Omit<NewFrequencia, AutomaticModelAttributes>): Promise<PersistedFrequencia> {
		const existingFrequencia = await this.frequenciaRepository.getOneById(id);

		return this.frequenciaRepository.updateOneById(id, {
			...frequencia,
			id: existingFrequencia.id,
			criadoEm: existingFrequencia.criadoEm,
			atualizadoEm: new Date(),
		});
	}
}
