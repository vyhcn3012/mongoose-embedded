import { EmbeddedOption } from '../decorators';

export interface EmbeddedMetadata {
    target: Function;
    propertyKey: string | symbol;
    option: EmbeddedOption;
}
