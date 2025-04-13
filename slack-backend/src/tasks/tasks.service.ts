import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>
  ) {}

  async create(dto: CreateTaskDto, userId: number): Promise<Task> {
    const task = this.taskRepo.create({
      ...dto,
      user: { id: userId },
    });
    return this.taskRepo.save(task);
  }

  async findAll(userId: number): Promise<Task[]> {
    return this.taskRepo.find({
      where: { user: { id: userId } },
      order: { dueDate: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Task | null> {
    return this.taskRepo.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.taskRepo.delete(id);
  }
}
