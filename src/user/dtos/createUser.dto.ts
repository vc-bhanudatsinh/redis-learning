import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {
  errorMessages,
  replaceFieldInMessage,
} from '../../common/config/messages.config';

export class CreateUserDto {
  @IsEmail({}, { message: errorMessages.INVALID_EMAIL })
  @IsNotEmpty({
    message: replaceFieldInMessage('Email', errorMessages.REQUIRED_FIELD),
  })
  email: string;

  @IsNotEmpty({
    message: replaceFieldInMessage('Name', errorMessages.REQUIRED_FIELD),
  })
  @IsString()
  name: string;
}
