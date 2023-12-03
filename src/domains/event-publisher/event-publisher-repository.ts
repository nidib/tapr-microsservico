export type Action = 'create' | 'update' | 'delete';
export type Entity = 'nota' | 'frequencia';

export interface EventPublisherRepository {
	send<T extends {}>(action: Action, entity: Entity, body: T): Promise<boolean>;
}
