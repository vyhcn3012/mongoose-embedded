import { EMBEDDED_TYPE } from '../constants';
import { EmbeddedMetadataStorage } from '../storages';

export interface EmbeddedOption {
    type: any;
    embeddedType: EMBEDDED_TYPE;
    ref?: string;
}

export function Embedded(option?: EmbeddedOption): PropertyDecorator {
    return (target: object, propertyKey: string | symbol) => {
        EmbeddedMetadataStorage.addEmbeddedMetadata({
            target: target.constructor,
            propertyKey: propertyKey as string,
            option: option as EmbeddedOption,
        });
    };
}
