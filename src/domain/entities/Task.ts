export interface Task {
    _id?: string; // Asegúrate de que _id esté definido como opcional
    name: string;
    description: string;
    date: string;
    time: string;
    status: string;
    category: string;
    modificationDate?: string;
    modificationTime?: string;
    userId?: string;
}