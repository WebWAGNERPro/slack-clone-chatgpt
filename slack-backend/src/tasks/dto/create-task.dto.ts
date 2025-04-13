export class CreateTaskDto {
  title: string;
  description?: string;
  status?: 'todo' | 'in_progress' | 'done';
  dueDate?: Date;
}
