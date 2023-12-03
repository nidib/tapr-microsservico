import { ServiceBusSender } from '@azure/service-bus';

import { logger } from 'src/config/logger';
import { Action, Entity, EventPublisherRepository } from 'src/domains/event-publisher/event-publisher-repository';

export class ServiceBusRepository implements EventPublisherRepository {
	constructor(private sender: ServiceBusSender) {}

	async send<T extends {}>(action: Action, entity: Entity, body: T): Promise<boolean> {
		try {
			await this.sender.sendMessages({ body: { action, entity, value: body } });
		} catch (error) {
			logger.error(error);
			return false;
		}

		return true;
	}
}
