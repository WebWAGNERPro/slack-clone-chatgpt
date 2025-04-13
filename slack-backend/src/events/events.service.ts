import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>
  ) {}

  async create(dto: CreateEventDto): Promise<Event> {
    const event = this.eventRepo.create(dto);
    return this.eventRepo.save(event);
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepo.find({ order: { startDate: 'ASC' } });
  }

  async findOne(id: number): Promise<Event | null> {
    return this.eventRepo.findOneBy({ id });
  }  

  async delete(id: number): Promise<void> {
    await this.eventRepo.delete(id);
  }
}
