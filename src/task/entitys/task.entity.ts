import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../status/status-task';
import { User } from 'src/user/entities/user.entity';

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
  @Column({ type: 'int' })
  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'CASCADE',
    eager: true,
    nullable: false,
  })
  user: User;
}
