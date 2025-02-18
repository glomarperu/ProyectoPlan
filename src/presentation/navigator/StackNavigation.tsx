import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../views/auth/LoginScreen';
import { RegisterScreen } from '../views/auth/RegisterScreen';
import { HomeScreen } from '../views/home/HomeScreen';
import { AddTaskScreen } from '../views/tasks/AddTaskScreen';
import { EditTaskScreen } from '../views/tasks/EditTaskScreen';
import { TaskListScreen } from '../views/tasks/TaskListScreen';
import { ConfigurationScreen } from '../views/config/ConfigurationScreen';
import { DeleteTaskScreen } from '../views/tasks/DeleteTaskScreen';

export type RootStackParams = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    AddTask: undefined;
    EditTask: { taskId: string };
    TaskList: undefined;
    Config: undefined;
    DeleteTask: { taskId: string }; 
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            {}
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