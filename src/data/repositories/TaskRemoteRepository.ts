import api from "../../api/api";
import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";

export class TaskRemoteRepository implements TaskRepository {
    async getTasks(): Promise<Task[]> {
        const response = await api.get('/tasks');
        return response.data;
    }

    async addTask(task: Task): Promise<void> {
        await api.post('/tasks', task);
    }

    async updateTask(id: string, updates: Partial<Task>): Promise<void> {
        await api.put(`/tasks/${id}`, updates);
    }

    async deleteTask(id: string): Promise<void> {
        await api.delete(`/tasks/${id}`);
    }
}