import React, { createContext, useState, ReactNode, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


interface Task { // interface para definir la estructura de los datos
    id: string;
    name: string;
    description: string;
    date: string;
    time: string;
    status: string;
    category: string;
}

interface TaskContextProps { // interface para definir el contexto
    tasks: Task[];  // array de tareas
    obtenerTasks: () => Promise<void>; // funcion para obtener las tareas
    addTask: (task: Omit<Task, 'id'>) => Promise<void>; // funcion para agregar una tarea
    updateTask: (id: string, updates: Partial<Task>) => Promise<void>; // funcion para actualizar una tarea
    deleteTask: (id: string) => Promise<void>; // funcion para eliminar una tarea
}

export const TaskContext = createContext<TaskContextProps | null>(null);//crear el contexto

export const TaskProvider = ({ children }: { children: ReactNode }) => { //funcion que devuelve el contexto

    const [tasks, setTasks] = useState<Task[]>([]); // estado para las tareas

    const userId = auth().currentUser?.uid; // obtener el id del usuario autenticado

    useEffect(() => { // cuando se monta el componente
        if (userId) { // si el usuario está autenticado
            obtenerTasks(); // obtener las tareas
        }
    }, [userId]); // el efecto se ejecuta cuando el usuario cambia

    const obtenerTasks = async () => { // funcion para obtener las tareas
        const user = auth().currentUser; // Obtener el usuario autenticado
        if (!user) { // si no hay usuario autenticado
            console.error('No se encontró usuario autenticado.');
            return;
        }
        try { // intentar obtener las tareas
            const taskCollection = await firestore() // obtener la coleccion de tareas
                .collection('tasks') // especificar la coleccion
                .doc(user.uid) // Documento del usuario
                .collection('userTasks') // coleccion de tareas del usuario
                .get(); // obtener los documentos de la coleccion
            const taskData = taskCollection.docs.map(doc => ({ // convertir los documentos a objetos
                id: doc.id, // id del documento
                ...doc.data(), // datos del documento
            } as Task)); // convertir a tipo Task
            setTasks(taskData); // actualizar el estado de las tareas
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addTask = async (task: Omit<Task, 'id'>) => { // funcion para agregar una tarea

        const user = auth().currentUser; // Obtener el usuario autenticado
        if (!user) { // si no hay usuario autenticado
            console.error('No se encontró usuario autenticado.');
            return;
        }
        try { // intentar agregar la tarea
            await firestore() // obtener la base de datos
                .collection('tasks') // especificar la coleccion
                .doc(user.uid) // Documento del usuario
                .collection('userTasks') // coleccion de tareas del usuario
                .add(task); // agregar la tarea
            obtenerTasks(); // obtener las tareas 
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const updateTask = async (id: string, updates: Partial<Task>) => { // funcion para actualizar una tarea
        try { // intentar actualizar la tarea
            if (!userId) return; // si no hay usuario autenticado
            await firestore() // obtener la base de datos
                .collection('tasks') // especificar la coleccion
                .doc(userId) // Documento del usuario
                .collection('userTasks') 
                .doc(id)
                .update(updates); // actualizar la tarea
            setTasks((prevTasks) => // actualizar el estado de las tareas
                prevTasks.map((task) => // recorrer las tareas
                    task.id === id ? { ...task, ...updates } : task) // actualizar la tarea si coincide con el id
            );
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };
    const deleteTask = async (taskId: string) => { // funcion para eliminar una tarea
        try { // intentar eliminar la tarea
            if (!userId) return; // si no hay usuario autenticado
            await firestore() // obtener la base de datos
                .collection('tasks')
                .doc(userId)
                .collection('userTasks')
                .doc(taskId) // eliminar la tarea
                .delete(); 
            setTasks(tasks.filter((task) => task.id !== taskId)); // eliminar la tarea del estado
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <TaskContext.Provider 
            value={{ tasks, addTask, obtenerTasks, updateTask, deleteTask }}> 
            {children}
        </TaskContext.Provider>
    );
};