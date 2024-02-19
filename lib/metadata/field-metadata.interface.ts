export interface FieldOption {
    ref: string;
    embeddedType: string;
}

export interface FieldMetadata {
    target: Function;
    propertyKey: string | symbol;
    options: FieldOption;
}
