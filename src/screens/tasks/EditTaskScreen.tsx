import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { TaskContext } from '../../context/TaskContext';
import { RootStackParams } from '../../routes/StackNavigation';
import { styles } from '../../theme/styles';
import { ButtonComponent } from '../../components/ButtonComponent';

export const EditTaskScreen = () => { 

    const { updateTask, tasks } = useContext(TaskContext)!; // obteniendo el contexto de la tarea
    const route = useRoute<RouteProp<RootStackParams, 'EditTask'>>(); // obteniendo la ruta actual

    const { taskId } = route.params; // obteniendo el id de la tarea a editar
    const navigation = useNavigation(); // obteniendo la navegación actual
    const task = tasks.find(t => t.id === taskId); // obteniendo la tarea a editar

    // Estados para los cambios
    const [name, setName] = useState(task?.name || ''); 
    const [description, setDescription] = useState(task?.description || '');
    const [status, setStatus] = useState(task?.status || 'Pendiente');
    const [category, setCategory] = useState(task?.category || 'General');

    const handleUpdateTask = async () => { // función para actualizar la tarea
        if (!name || !description) { // validando que no estén vacíos
            Alert.alert('Error', 'Por favor, completa todos los campos obligatorios.');
            return;
        }

        const date = new Date().toISOString().split('T')[0];
        const time = new Date().toLocaleTimeString();

        try { // intentando actualizar la tarea
            await updateTask(taskId, { // actualizando la tarea
                name,
                description,
                status,
                category,
                date,
                time,
            });
            Alert.alert('Éxito', 'Tarea actualizada correctamente', [
                {
                    text: 'Aceptar',
                    onPress: () => navigation.goBack(),
                },
            ]);
        } catch (error) {
            Alert.alert('Error', 'No se pudo actualizar la tarea.');
        }
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Tarea</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de la tarea"
                value={name}
                onChangeText={setName} />
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={description}
                onChangeText={setDescription}
                multiline />
            <Text style={styles.label}>Estado</Text>
            <Picker
                selectedValue={status}
                onValueChange={(itemValue) => setStatus(itemValue)}
                style={styles.picker}>
                <Picker.Item label="Pendiente" value="Pendiente" />
                <Picker.Item label="En progreso" value="En progreso" />
                <Picker.Item label="Completado" value="Completado" />
            </Picker>
            <Text style={styles.label}>Categoría</Text>
            <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={styles.picker}>
                <Picker.Item label="General" value="General" />
                <Picker.Item label="Trabajo" value="Trabajo" />
                <Picker.Item label="Escuela" value="Escuela" />
            </Picker>
            <ButtonComponent
                onAction={handleUpdateTask}
                label="Actualizar Tarea" />
        </View>
    );
};