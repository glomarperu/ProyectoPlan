import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './src/routes/StackNavigation';
import auth from '@react-native-firebase/auth';
import { TaskProvider } from './src/context/TaskContext';
import { Text, View } from 'react-native';

function App(): React.JSX.Element {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);

  const onAuthStateChanged = (user: any) => {
    console.log('Estado de autenticación cambiado:', user);
    setUser(user);
    if (initializing) setInitializing(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <TaskProvider>
      <NavigationContainer>
        <StackNavigation user={user} />
      </NavigationContainer>
  </TaskProvider>
  );
}

export default App;