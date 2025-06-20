import { TaskStatus } from '../status/status-task';
import { IsEnum } from 'class-validator';

export class UpdateStatusTask {
  @IsEnum(TaskStatus, {
    message: 'Invalid status',
  })
  status: TaskStatus;
}
