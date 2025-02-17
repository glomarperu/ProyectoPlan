import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TaskProvider } from './src/presentation/context/TaskContext';
import { StackNavigation } from './src/presentation/navigator/StackNavigation';

const App = () => {
    return (
            <TaskProvider>
                <NavigationContainer>
                    <StackNavigation />
                </NavigationContainer>
            </TaskProvider>
    );
};

export default App;