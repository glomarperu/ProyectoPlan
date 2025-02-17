import { TaskRepository } from '../repositories/TaskRepository';
import { Task } from '../entities/Task';

export class GetTasks {
    constructor(private taskRepository: TaskRepository) {}

    async execute(): Promise<Task[]> {
        return this.taskRepository.getTasks();
    }
}