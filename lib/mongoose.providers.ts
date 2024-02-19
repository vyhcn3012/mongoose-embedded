import { Provider } from '@nestjs/common';
import { Connection, Document, Model } from 'mongoose';
import { getConnectionToken, getModelToken } from './common/mongoose.utils';
import { AsyncModelFactory, ModelDefinition } from './interfaces';
import { eventEmitter } from './utils/event';
export function createMongooseProviders(
    connectionName?: string,
    options: ModelDefinition[] = [],
): Provider[] {
    return options.reduce(
        (providers, option) => [
            ...providers,
            ...(option.discriminators || []).map((d) => ({
                provide: getModelToken(d.name, connectionName),
                useFactory: (model: Model<Document>) =>
                    model.discriminator(d.name, d.schema, d.value),
                inject: [getModelToken(option.name, connectionName)],
            })),
            {
                provide: getModelToken(option.name, connectionName),
                useFactory: (connection: Connection) => {
                    const model = connection.models[option.name]
                        ? connection.models[option.name]
                        : connection.model(
                              option.name,
                              option.schema,
                              option.collection,
                          );

                    const wrappedModel = wrapModelWithInterception(
                        model,
                        option.name,
                    );

                    return wrappedModel;
                },
                inject: [getConnectionToken(connectionName)],
            },
        ],
        [] as Provider[],
    );
}

export function createMongooseAsyncProviders(
    connectionName?: string,
    modelFactories: AsyncModelFactory[] = [],
): Provider[] {
    return modelFactories.reduce((providers, option) => {
        return [
            ...providers,
            {
                provide: getModelToken(option.name, connectionName),
                useFactory: async (
                    connection: Connection,
                    ...args: unknown[]
                ) => {
                    const schema = await option.useFactory(...args);
                    const model = connection.model(
                        option.name,
                        schema,
                        option.collection,
                    );
                    return model;
                },
                inject: [
                    getConnectionToken(connectionName),
                    ...(option.inject || []),
                ],
            },
            ...(option.discriminators || []).map((d) => ({
                provide: getModelToken(d.name, connectionName),
                useFactory: (model: Model<Document>) =>
                    model.discriminator(d.name, d.schema, d.value),
                inject: [getModelToken(option.name, connectionName)],
            })),
        ];
    }, [] as Provider[]);
}

function wrapModelWithInterception(
    model: Model<Document>,
    modelName: string,
): Model<Document> {
    const originalCreate = model.create;
    const originalUpdateOne = model.updateOne;

    model.create = function (doc: any, options?: any): Promise<any> {
        return originalCreate.call(model, doc, options).then((result) => {
            eventEmitter.emit('create', {
                doc,
                options,
                modelName,
                result,
            });
            return result;
        });
    };

    model.updateOne = function (filter: any, update: any, options?: any): any {
        return originalUpdateOne
            .call(model, filter, update, options)
            .then((result) => {
                eventEmitter.emit('updateOne', {
                    filter,
                    update,
                    options,
                    modelName,
                    result,
                });
                return result;
            });
    };

    return model;
}
