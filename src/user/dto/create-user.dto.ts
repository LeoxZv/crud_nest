import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 100)
  name: string;
}
