import { TaskRepository } from '../repositories/TaskRepository';

export class DeleteTask {
    constructor(private taskRepository: TaskRepository) {}

    async execute(id: string): Promise<void> {
        await this.taskRepository.deleteTask(id);
    }
}