import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  title?: string;
  @IsOptional()
  @IsString()
  description?: string;
}
