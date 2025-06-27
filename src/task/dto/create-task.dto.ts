import { IsNumber, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @Length(3, 20)
  title?: string;
  @IsString()
  description?: string;
  @IsNumber()
  user: number;
}
