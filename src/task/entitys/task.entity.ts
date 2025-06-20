import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../status/status-task';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ default: 'pending', type: 'enum', enum: TaskStatus })
  status: TaskStatus;
}
