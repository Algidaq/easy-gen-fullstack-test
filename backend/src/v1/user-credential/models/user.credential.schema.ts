import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
export type UserCredentialDocument = HydratedDocument<UserCredentialMongo>;
@Schema({ collection: 'user_credential' })
export class UserCredentialMongo {
  @Prop({ type: SchemaTypes.ObjectId, unique: true, index: true })
  userId: string;
  @Prop({ type: SchemaTypes.String, required: true })
  salt: string;
  @Prop({ type: SchemaTypes.String, required: true })
  hash: string;
}

export const UserCredentialSchema =
  SchemaFactory.createForClass(UserCredentialMongo);
