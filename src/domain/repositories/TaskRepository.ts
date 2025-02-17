import { Task } from '../entities/Task';

export interface TaskRepository {
    getTasks(): Promise<Task[]>;
    addTask(task: Task): Promise<void>;
    updateTask(id: string, updates: Partial<Task>): Promise<void>;
    deleteTask(id: string): Promise<void>;
}