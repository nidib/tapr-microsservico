import type { NewNota, PersistedNota } from 'src/domains/nota/nota';

export interface NotaRepository {
	getAll(): Promise<PersistedNota[]>;

	getOneById(id: string): Promise<PersistedNota>;

	createOne(nota: NewNota): Promise<null | PersistedNota>;

	updateOneById(id: string, updatedNota: PersistedNota): Promise<PersistedNota>;

	deleteById(id: string): Promise<boolean>;
}
