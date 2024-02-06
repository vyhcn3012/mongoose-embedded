import { Type } from '@nestjs/common';
import { EmbeddedMetadata } from '../metadata/embedded-metadata.interface';

export class EmbeddedMetadataStorageHost {
    private embeddedList = new Array<EmbeddedMetadata>();

    addEmbeddedMetadata(metadata: EmbeddedMetadata) {
        this.embeddedList.unshift(metadata);
    }

    getEmbeddedByTarget(target: Type<unknown>) {
        return this.embeddedList.find((item) => item?.option?.type === target);
    }
}

const globalRef = global as any;
export const EmbeddedMetadataStorage: EmbeddedMetadataStorageHost =
    globalRef.MongoEmbeddedMetadataStorage ||
    (globalRef.MongoEmbeddedMetadataStorage =
        new EmbeddedMetadataStorageHost());
