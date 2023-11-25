import { ErrorResponse } from '@azure/cosmos';

import { NewFrequencia, PersistedFrequencia } from 'src/domains/frequencia/frequencia';
import { FrequenciaRepository } from 'src/domains/frequencia/frequencia-repository';
import { EntityNotFoundException } from 'src/exceptions/entity-not-found-exception';
import { frequenciaContainer } from 'src/infra/cosmos/cosmos-db';

export class FrequenciaCosmosRepository implements FrequenciaRepository {
	async getAll(): Promise<PersistedFrequencia[]> {
		const { resources: frequencias } = await frequenciaContainer.items.readAll<PersistedFrequencia>().fetchAll();

		return frequencias;
	}

	async getOneById(id: string): Promise<PersistedFrequencia> {
		const { resource: existingFrequencia } = await frequenciaContainer.item(id, id).read<PersistedFrequencia>();

		if (!existingFrequencia) {
			throw new EntityNotFoundException();
		}

		return existingFrequencia;
	}

	async createOne(frequencia: NewFrequencia): Promise<null | PersistedFrequencia> {
		const created = await frequenciaContainer.items.create(frequencia);

		return created.resource ?? null;
	}

	async updateOneById(id: string, frequencia: NewFrequencia): Promise<PersistedFrequencia> {
		const { resource: updatedFrequencia } = await frequenciaContainer.item(id, id).replace(frequencia);

		if (!updatedFrequencia) throw new EntityNotFoundException();

		return updatedFrequencia;
	}

	async deleteById(id: string): Promise<boolean> {
		let deleted = false;

		try {
			await frequenciaContainer.item(id, id).delete<PersistedFrequencia>();
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
