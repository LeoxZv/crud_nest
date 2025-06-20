import { IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @Length(3, 20)
  title?: string;
  @IsString()
  description?: string;
}
