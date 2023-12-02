import { CosmosClient } from '@azure/cosmos';

import { getEnv } from 'src/config/env';

const cosmosClient = new CosmosClient({
	endpoint: process.env.COSMOS_ENDPOINT as string,
	key: process.env.COSMOS_KEY as string,
});

const DATABAE_NAME = getEnv('COSMOS_DB_NAME');
const ENTITIES_PARTITION_KEY = '/id';
const COSMOS_DATABASE = cosmosClient.database(DATABAE_NAME);

export const Entities = {
	NOTA: 'nota',
	FREQUENCIA: 'frequencia',
};

export const frequenciaContainer = COSMOS_DATABASE.container(Entities.FREQUENCIA);
export const notaContainer = COSMOS_DATABASE.container(Entities.NOTA);

export function createContainerIfNotExists(name: string) {
	return COSMOS_DATABASE.containers.createIfNotExists({ id: name, partitionKey: ENTITIES_PARTITION_KEY });
}
