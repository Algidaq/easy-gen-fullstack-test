import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaType, SchemaTypes, Types } from 'mongoose';

export type UserDocument = HydratedDocument<UserMongo>;

@Schema({ collection: 'user' })
export class UserMongo {
  @Prop({ type: SchemaTypes.String, length: 256, required: true })
  name: string;
  @Prop({
    type: SchemaTypes.String,
    required: true,
    lowercase: true,
    unique: true,
    index: true,
  })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(UserMongo);
