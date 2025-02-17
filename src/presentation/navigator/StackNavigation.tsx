import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../views/auth/LoginScreen';
import { RegisterScreen } from '../views/auth/RegisterScreen';
import { HomeScreen } from '../views/home/HomeScreen';
import { AddTaskScreen } from '../tasks/AddTaskScreen';
import { EditTaskScreen } from '../tasks/EditTaskScreen';
import { TaskListScreen } from '../tasks/TaskListScreen';
import { ConfigurationScreen } from '../views/config/ConfigurationScreen';
import { DeleteTaskScreen } from '../tasks/DeleteTaskScreen';



// Define los parámetros de la ruta DeleteTask
export type RootStackParams = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    AddTask: undefined;
    EditTask: { taskId: string };
    TaskList: undefined;
    Config: undefined;
    DeleteTask: { taskId: string }; // Agrega esta línea
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            {/* Define todas las pantallas aquí */}
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ title: 'Registro' }}
            />
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Inicio' }}
            />
            <Stack.Screen
                name="AddTask"
                component={AddTaskScreen}
                options={{ title: 'Agregar Tarea' }}
            />
            <Stack.Screen
                name="EditTask"
                component={EditTaskScreen}
                options={{ title: 'Editar Tarea' }}
            />
            <Stack.Screen
                name="TaskList"
                component={TaskListScreen}
                options={{ title: 'Lista de Tareas' }}
            />
            <Stack.Screen
                name="Config"
                component={ConfigurationScreen}
                options={{ title: 'Configuración' }}
            />
            <Stack.Screen
                name="DeleteTask"
                component={DeleteTaskScreen}
                options={{ title: 'Eliminar Tarea' }}
            />
        </Stack.Navigator>
    );
};