import { EventEmitter } from 'events';
import { QueueDatabaseAction } from './queue-database-action';
export const eventEmitter = new EventEmitter();
const queueDatabaseAction = new QueueDatabaseAction();

eventEmitter.on('create', (data) => {
    queueDatabaseAction.enqueue(data);
});
