import { Task } from 'src/task/entitys/task.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
