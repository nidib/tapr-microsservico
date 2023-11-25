import { CosmosClient } from '@azure/cosmos';

const cosmosClient = new CosmosClient({
	endpoint: process.env.COSMOS_ENDPOINT as string,
	key: process.env.COSMOS_KEY as string,
});

export const frequenciaContainer = cosmosClient.database('tapr').container('frequencia');
export const notaContainer = cosmosClient.database('tapr').container('nota');
