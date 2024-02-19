// import { EmbeddedMetadataStorage } from '../storages';

// export const pick = Symbol('pick');

// export interface PickInput {
//     global?: boolean;
//     entities?: Array<string>;
// }
// export function Pick(options?: PickInput): PropertyDecorator {
//     return (target: object, propertyKey: string | symbol) => {
//         EmbeddedMetadataStorage.addPickMetadata({
//             target: target.constructor,
//             propertyKey: propertyKey as string,
//             options: {
//                 global: options?.global || false,
//                 entities: options?.entities || [],
//             },
//         });
//     };
// }
