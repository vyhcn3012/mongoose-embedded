import { Type } from '@nestjs/common';
import { EmbeddedMetadata } from '../metadata/embedded-metadata.interface';
import { PickMetadata } from '../metadata/pick-metadata.interface';

export class EmbeddedMetadataStorageHost {
    private embeddedList = new Array<EmbeddedMetadata>();
    private pickList = new Array<PickMetadata>();

    addEmbeddedMetadata(metadata: EmbeddedMetadata) {
        this.embeddedList.unshift(metadata);
    }

    // addPickMetadata(metadata: PickMetadata) {}

    getEmbeddedByTarget(target: Type<unknown>) {
        return this.embeddedList.filter((item) => item.target === target);
    }
}

const globalRef = global as any;
export const EmbeddedMetadataStorage: EmbeddedMetadataStorageHost =
    globalRef.MongoEmbeddedMetadataStorage ||
    (globalRef.MongoEmbeddedMetadataStorage =
        new EmbeddedMetadataStorageHost());
