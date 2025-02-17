import { TaskRepository } from '../repositories/TaskRepository';
import { Task } from '../entities/Task';

export class UpdateTask {
    constructor(private taskRepository: TaskRepository) {}

    async execute(id: string, updates: Partial<Task>): Promise<void> {
        await this.taskRepository.updateTask(id, updates);
    }
}