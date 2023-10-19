import { IsMongoId } from 'class-validator';

export class GetUserDetailsDto {
  @IsMongoId()
  id: string;
}
