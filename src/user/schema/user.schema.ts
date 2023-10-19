import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import {
  errorMessages,
  replaceFieldInMessage,
} from 'src/common/config/messages.config';

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop({
    type: SchemaTypes.String,
    required: [
      true,
      replaceFieldInMessage('Email', errorMessages.REQUIRED_FIELD),
    ],
    unique: [
      true,
      replaceFieldInMessage('Email', errorMessages.DUPLICATE_DATA),
    ],
  })
  email: string;

  @Prop({
    type: SchemaTypes.String,
    required: [
      true,
      replaceFieldInMessage('Name', errorMessages.REQUIRED_FIELD),
    ],
  })
  name: string;
}

export const userSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;
