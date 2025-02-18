export interface Task {
    _id?: string; 
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