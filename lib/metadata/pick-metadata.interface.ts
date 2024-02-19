export interface PickOptions {
    global: string[];
    [collectionName: string]: string[];
}

export interface PickMetadata {
    target: Function;
    propertyKey: string | symbol;
    options: PickOptions;
}
