import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParams } from '../navigator/StackNavigation';
import { useTasks } from '../hooks/useTasks';
import { styles } from '../theme/styles';
import { ButtonComponent } from '../components/ButtonComponent';

type EditTaskScreenRouteProp = RouteProp<RootStackParams, 'EditTask'>;

export const EditTaskScreen = () => {
    const route = useRoute<EditTaskScreenRouteProp>();
    const { taskId } = route.params;
    const { tasks, updateTask } = useTasks();
    const task = tasks.find((t) => t._id === taskId); // Usa t._id en lugar de t.id

    const [name, setName] = useState(task?.name || '');
    const [description, setDescription] = useState(task?.description || '');
    const [status, setStatus] = useState(task?.status || 'Pendiente');
    const [category, setCategory] = useState(task?.category || 'General');

    const handleUpdateTask = async () => {
        if (!name || !description) {
            Alert.alert('Error', 'Por favor, completa todos los campos');
            return;
        }

        const updatedTask = {
            name,
            description,
            status,
            category,
            modificationDate: new Date().toISOString().split('T')[0],
            modificationTime: new Date().toLocaleTimeString(),
        };

        try {
            await updateTask(taskId, updatedTask);
            Alert.alert('Éxito', 'Tarea actualizada correctamente');
        } catch (error) {
            Alert.alert('Error', 'No se pudo actualizar la tarea');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Tarea</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de la tarea"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <Text style={styles.label}>Estado</Text>
            <Picker
                selectedValue={status}
                onValueChange={(itemValue) => setStatus(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Pendiente" value="Pendiente" />
                <Picker.Item label="En progreso" value="En progreso" />
                <Picker.Item label="Completado" value="Completado" />
            </Picker>
            <Text style={styles.label}>Categoría</Text>
            <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="General" value="General" />
                <Picker.Item label="Trabajo" value="Trabajo" />
                <Picker.Item label="Escuela" value="Escuela" />
            </Picker>
            <ButtonComponent onAction={handleUpdateTask} label="Actualizar Tarea" />
        </View>
    );
};