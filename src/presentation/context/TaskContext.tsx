import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Task } from '../../domain/entities/Task';
import { GetTasks } from '../../domain/usecases/GetTasks';
import { AddTask } from '../../domain/usecases/AddTask';
import { UpdateTask } from '../../domain/usecases/UpdateTask';
import { DeleteTask } from '../../domain/usecases/DeleteTask';
import { TaskRemoteRepository } from '../../data/repositories/TaskRemoteRepository';

interface TaskContextProps {
    tasks: Task[];
    obtenerTasks: () => Promise<void>;
    addTask: (task: Task) => Promise<void>;
    updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
}

export const TaskContext = createContext<TaskContextProps | null>(null);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const taskRepository = new TaskRemoteRepository();

    const obtenerTasks = async () => {
        const getTasks = new GetTasks(taskRepository);
        const tasks = await getTasks.execute();
        setTasks(tasks);
    };

    const addTask = async (task: Task) => {
        const addTask = new AddTask(taskRepository);
        await addTask.execute(task);
        await obtenerTasks();
    };

    const updateTask = async (id: string, updates: Partial<Task>) => {
        const updateTask = new UpdateTask(taskRepository);
        await updateTask.execute(id, updates);
        await obtenerTasks();
    };

    const deleteTask = async (id: string) => {
        const deleteTask = new DeleteTask(taskRepository);
        await deleteTask.execute(id);
        await obtenerTasks();
    };

    return (
        <TaskContext.Provider
            value={{ tasks, obtenerTasks, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};