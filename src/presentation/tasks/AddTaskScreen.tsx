import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Platform, Linking, NativeModules } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import { StackNavigationProp } from '@react-navigation/stack';
import PushNotification from 'react-native-push-notification';
import { RootStackParams } from '../navigator/StackNavigation';
import { useTasks } from '../hooks/useTasks';
import { styles } from '../theme/styles';
import { ButtonComponent } from '../components/ButtonComponent';

const { AlarmPermissionModule } = NativeModules;

type AddTaskScreenNavigationProp = StackNavigationProp<RootStackParams, 'AddTask'>;

interface Props {
    navigation: AddTaskScreenNavigationProp;
}

export const AddTaskScreen = ({ navigation }: Props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pendiente');
    const [category, setCategory] = useState('General');
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const { addTask } = useTasks();

    // Función para abrir la configuración de la aplicación
    const requestExactAlarmPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version >= 31) {
            try {
                await Linking.openSettings(); // Abre la configuración de la aplicación
            } catch (error) {
                console.error("No se pudo abrir la configuración:", error);
            }
        }
    };

    // Función para verificar si el permiso SCHEDULE_EXACT_ALARM está otorgado
    const checkExactAlarmPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version >= 31) {
            try {
                const granted = await AlarmPermissionModule.checkExactAlarmPermission();
                return granted;
            } catch (error) {
                console.error("Error al verificar el permiso:", error);
                return false;
            }
        }
        return true; // No se requiere en versiones anteriores a Android 12
    };

    // Función para programar la notificación
    const scheduleNotification = async (task: any) => {
        const hasPermission = await checkExactAlarmPermission();
        if (!hasPermission) {
            Alert.alert(
                "Permiso Requerido",
                "Por favor, habilita el permiso para programar alarmas exactas en la configuración de la aplicación.",
                [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Abrir Configuración", onPress: () => requestExactAlarmPermission() },
                ]
            );
            return;
        }

        const notificationTime = new Date(task.scheduledDate);
        notificationTime.setMinutes(notificationTime.getMinutes() - 10); // 10 minutos antes

        try {
            PushNotification.localNotificationSchedule({
                channelId: "default-channel-id", // Asegúrate de configurar el canal de notificaciones
                title: "Recordatorio de Tarea",
                message: `La tarea "${task.name}" está programada para pronto.`,
                date: notificationTime,
                allowWhileIdle: true,
            });
        } catch (error) {
            console.error("Error al programar la notificación:", error);
            Alert.alert(
                "Error",
                "No se pudo programar la notificación. Asegúrate de que los permisos estén habilitados."
            );
        }
    };

    const handleAddTask = async () => {
        if (!name || !description) {
            Alert.alert('Error', 'Por favor, completa todos los campos');
            return;
        }

        const newTask = {
            name,
            description,
            status,
            category,
            date: date.toISOString().split('T')[0],
            time: date.toLocaleTimeString(),
            scheduledDate: date, // Fecha y hora programada
        };

        try {
            await addTask(newTask);
            await scheduleNotification(newTask); // Programar la notificación
            Alert.alert('Éxito', 'Tarea agregada correctamente');
            navigation.goBack();
        } catch (error) {
            console.error('Error al agregar la tarea:', error);
            Alert.alert('Error', 'No se pudo agregar la tarea');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agregar Tarea</Text>
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
            <Text style={styles.label}>Fecha y Hora Programada</Text>
            <ButtonComponent onAction={() => setOpen(true)} label="Seleccionar Fecha y Hora" />
            <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(selectedDate) => {
                    setOpen(false);
                    setDate(selectedDate);
                }}
                onCancel={() => {
                    setOpen(false);
                }}
                mode="datetime"
            />
            <ButtonComponent onAction={handleAddTask} label="Agregar Tarea" />
        </View>
    );
};