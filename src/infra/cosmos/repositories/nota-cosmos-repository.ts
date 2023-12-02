import { ErrorResponse } from '@azure/cosmos';

import { NewNota, PersistedNota } from 'src/domains/nota/nota';
import { NotaRepository } from 'src/domains/nota/nota-repository';
import { EntityNotFoundException } from 'src/exceptions/entity-not-found-exception';
import { notaContainer } from 'src/infra/cosmos/cosmos-db';

export class NotaCosmosRepository implements NotaRepository {
	async getAll(): Promise<PersistedNota[]> {
		const { resources: notas } = await notaContainer.items.readAll<PersistedNota>().fetchAll();

		return notas;
	}

	async getOneById(id: string): Promise<PersistedNota> {
		const { resource: existingNota } = await notaContainer.item(id, id).read<PersistedNota>();

		if (!existingNota) {
			throw new EntityNotFoundException();
		}

		return existingNota;
	}

	async createOne(nota: NewNota): Promise<null | PersistedNota> {
		const created = await notaContainer.items.create(nota);

		return created.resource ?? null;
	}

	async updateOneById(id: string, nota: NewNota): Promise<PersistedNota> {
		const { resource: updatedNota } = await notaContainer.item(id, id).replace(nota);

		if (!updatedNota) throw new EntityNotFoundException();

		return updatedNota;
	}

	async deleteById(id: string): Promise<boolean> {
		let deleted = false;

		try {
			await notaContainer.item(id, id).delete<PersistedNota>();
			deleted = true;
		} catch (e) {
			if (e instanceof ErrorResponse) {
				if (e.code === 404) {
					throw new EntityNotFoundException();
				}
			}

			throw e;
		}

		return deleted;
	}
}
