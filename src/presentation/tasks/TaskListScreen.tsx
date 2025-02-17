import React, { useEffect } from 'react';
import { View, Text, FlatList, Pressable, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from '../theme/styles';
import { useTasks } from '../hooks/useTasks';
import { ButtonComponent } from '../components/ButtonComponent';
import { RootStackParams } from '../navigator/StackNavigation';


type TaskListScreenNavigationProp = StackNavigationProp<RootStackParams, 'TaskList'>;

interface Props {
    navigation: TaskListScreenNavigationProp;
}

export const TaskListScreen = ({ navigation }: Props) => {
    const { tasks, obtenerTasks, deleteTask } = useTasks();

    useEffect(() => {
        obtenerTasks();
    }, []);

    const handleDeleteTask = async (id: string) => {
        try {
            await deleteTask(id);
            Alert.alert('Éxito', 'Tarea eliminada correctamente');
        } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar la tarea');
        }
    };  

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Tareas</Text>
            {tasks.length === 0 ? (
                <Text style={styles.noTasks}>No hay tareas disponibles</Text>
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item._id || ''} // Usa item._id en lugar de item.id
                    renderItem={({ item }) => (
                        <View style={styles.taskItem}>
                            <Text style={styles.taskName}>{item.name}</Text>
                            <Text style={styles.taskDescription}>{item.description}</Text>                           
                            <Text style={styles.taskDescription}>Estado: {item.status}</Text>
                            <Text style={styles.taskDescription}>Categoría: {item.category}</Text>
                            <Pressable
                                style={styles.editButton}
                                onPress={() => {
                                    if (item._id) { // Usa item._id en lugar de item.id
                                        navigation.navigate('EditTask', { taskId: item._id });
                                    } else {
                                        Alert.alert('Error', 'No se pudo encontrar el ID de la tarea');
                                    }
                                }}
                            >
                                <Text style={styles.buttonText}>Editar</Text>
                            </Pressable>
                            <Pressable
                                style={styles.deleteButton}
                                onPress={() => {
                                    if (item._id) { // Usa item._id en lugar de item.id
                                        handleDeleteTask(item._id);
                                    } else {
                                        Alert.alert('Error', 'No se pudo encontrar el ID de la tarea');
                                    }
                                }}
                            >
                                <Text style={styles.buttonText}>Eliminar</Text>
                            </Pressable>
                        </View>
                    )}
                />
            )}
            <ButtonComponent
                onAction={() => navigation.navigate('Home')}
                label="Volver al Inicio"
            />
        </View>
    );
};