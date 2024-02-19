import { Prop, Schema } from '../decorators';
import { SchemaFactory } from '../factories';
import { Field } from '../interfaces/field.interface';

@Schema({
    collection: '__schema__',
})
export class __Schema__ {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop()
    fields: Field[];
}

export const __Schema__Schema = SchemaFactory.createForClass(__Schema__);
