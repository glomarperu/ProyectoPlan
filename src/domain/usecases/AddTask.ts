import { TaskRepository } from '../repositories/TaskRepository';
import { Task } from '../entities/Task';

export class AddTask {
    constructor(private taskRepository: TaskRepository) {}

    async execute(task: Task): Promise<void> {
        await this.taskRepository.addTask(task);
    }
}
