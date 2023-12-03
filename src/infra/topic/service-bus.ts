import { ServiceBusClient } from '@azure/service-bus';

import { getEnv } from 'src/config/env';

const connectionString = getEnv('TOPIC_CONNECTION_URL');
const queueName = getEnv('TOPIC_NAME');

const sbClient = new ServiceBusClient(connectionString);

export function getSender() {
	return sbClient.createSender(queueName);
}
