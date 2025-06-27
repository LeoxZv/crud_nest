import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entitys/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateStatusTask } from './dto/update-status-task.dto';
import { TaskStatus } from './status/status-task';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new HttpException(`Task not found`, HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async createTask(task: CreateTaskDto) {
    const user = await this.userRepository.findOneBy({ id: task.user });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const newTask = this.taskRepository.create({
      title: task.title,
      description: task.description,
      user: user,
      status: TaskStatus.PENDING, // Default status
    });
    return this.taskRepository.save(newTask);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }
  async updateTask(id: number, task: Partial<Task>): Promise<Task> {
    const existingTask = await this.taskRepository.findOneBy({ id });
    if (!existingTask) {
      throw new HttpException(`Task not found`, HttpStatus.NOT_FOUND);
    }
    const updatedTask = Object.assign(existingTask, task);
    return this.taskRepository.save(updatedTask);
  }

  async updateStatus(id: number, status: UpdateStatusTask): Promise<Task> {
    const existingTask = await this.taskRepository.findOneBy({ id });
    if (!existingTask) {
      throw new HttpException(`Task not found`, HttpStatus.NOT_FOUND);
    }
    existingTask.status = status.status;
    return this.taskRepository.save(existingTask);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(`Task not found`, HttpStatus.NOT_FOUND);
    }
  }
}
