import { NewFrequencia, PersistedFrequencia } from 'src/domains/frequencia/frequencia';

export interface FrequenciaRepository {
	getAll(): Promise<PersistedFrequencia[]>;

	getOneById(id: string): Promise<PersistedFrequencia>;

	createOne(frequencia: NewFrequencia): Promise<null | PersistedFrequencia>;

	updateOneById(id: string, updatedFrequencia: PersistedFrequencia): Promise<PersistedFrequencia>;

	deleteById(id: string): Promise<boolean>;
}
