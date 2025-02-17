import React from 'react';
import { View, Text, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParams } from '../navigator/StackNavigation';
import { useTasks } from '../hooks/useTasks';
import { styles } from '../theme/styles';
import { ButtonComponent } from '../components/ButtonComponent';

// Define el tipo de la ruta
type DeleteTaskScreenRouteProp = RouteProp<RootStackParams, 'DeleteTask'>;

export const DeleteTaskScreen = () => {
    // Usa useRoute para obtener los parámetros de la ruta
    const route = useRoute<DeleteTaskScreenRouteProp>();
    const { taskId } = route.params; // Ahora TypeScript sabe que taskId es de tipo string

    const { deleteTask } = useTasks();

    const handleDeleteTask = async () => {
        try {
            await deleteTask(taskId);
            Alert.alert('Éxito', 'Tarea eliminada correctamente');
        } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar la tarea');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Eliminar Tarea</Text>
            <ButtonComponent onAction={handleDeleteTask} label="Confirmar Eliminación" />
        </View>
    );
};