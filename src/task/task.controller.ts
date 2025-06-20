import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entitys/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateStatusTask } from './dto/update-status-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get('id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateTaskDto): Promise<Task> {
    return this.taskService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, body);
  }

  @Put('status/:id')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateStatusTask,
  ): Promise<Task> {
    return this.taskService.updateStatus(id, body);
  }
  @Delete('id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
