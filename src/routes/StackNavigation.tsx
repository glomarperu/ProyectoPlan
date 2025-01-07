import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { AddTaskScreen } from '../screens/tasks/AddTaskScreen';
import { TaskListScreen } from '../screens/tasks/TaskListScreen';
import { EditTaskScreen } from '../screens/tasks/EditTaskScreen';

export type RootStackParams = { // se crea el tipo de dato
    Login: undefined;
    Register: undefined;
    Home: undefined;
    AddTask: undefined;
    TaskList: undefined;
    EditTask: { taskId: string };
};

const Stack = createStackNavigator<RootStackParams>(); // se crea el tipo de dato para el stack

interface StackNavigationProps { // se crea el tipo de dato para la navegación
    user: any; // Ajusta el tipo según Firebase Auth
}

export const StackNavigation = ({ user }: StackNavigationProps) => { // se crea la función de navegación
    const navigation = useNavigation(); // se obtiene la navegación
    
    useEffect(() => { // se crea el efecto para la navegación
        const unsubscribe = auth().onAuthStateChanged((user) => { // se obtiene el estado de autenticación
            if (!user) { // si no hay usuario
                navigation.dispatch( // se despliega la pantalla de login
                    CommonActions.reset({ // se resetea la navegación
                        index: 0, 
                        routes: [{ name: 'Login' }], 
                    })
                );
            }
        });
        return unsubscribe; 
    }, [navigation]); // se obtiene la navegación para el efecto

    return (
        <Stack.Navigator> 
            {user ? ( 
                <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="AddTask" component={AddTaskScreen} />
                    <Stack.Screen name="TaskList" component={TaskListScreen} />
                    <Stack.Screen name='EditTask' component={EditTaskScreen} />
                </>
            ) : ( 
                <>
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </>
            )}
        </Stack.Navigator>
    );
};