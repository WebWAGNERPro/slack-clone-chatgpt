import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() dto: CreateTaskDto, @User() user: any) {
    return this.tasksService.create(dto, user.userId);
  }

  @Get()
  findAll(@User() user: any) {
    return this.tasksService.findAll(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.delete(+id);
  }
}
