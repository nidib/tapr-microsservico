import { NewFrequencia, PersistedFrequencia, validateNewFrequencia } from 'src/domains/frequencia/frequencia';
import { FrequenciaRepository } from 'src/domains/frequencia/frequencia-repository';

type AutomaticModelAttributes = 'criadoEm' | 'atualizadoEm';

export class CreateFrequenciaUsecase {
	constructor(private frequenciaRepository: FrequenciaRepository) {}

	async execute(frequencia: Omit<NewFrequencia, AutomaticModelAttributes>): Promise<null | PersistedFrequencia> {
		const newFrequencia: NewFrequencia = {
			...frequencia,
			criadoEm: new Date(),
			atualizadoEm: new Date(),
		};
		const validatedFrequecia = validateNewFrequencia(newFrequencia);

		const createdFrequencia = await this.frequenciaRepository.createOne(validatedFrequecia);

		return createdFrequencia;
	}
}
