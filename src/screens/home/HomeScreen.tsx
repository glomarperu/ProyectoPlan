import React from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../routes/StackNavigation';
import { ButtonComponent } from '../../components/ButtonComponent';
import { styles } from '../../theme/styles';

export const HomeScreen = () => {  // se exporta la funcion

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>(); // se usa el hook para obtener la navegacion

  const logout = async () => {
    try {
      await auth().signOut();
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        );
      }, 500);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // eliminos haciones de consola y agrego las funciones del ButtonComponent para ejecutar las vistas
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <ButtonComponent onAction={logout} label="Cerrar Sesión" />
      <ButtonComponent
        label="Agregar Tarea"
        onAction={() => navigation.navigate('AddTask')}
      />
      <ButtonComponent
        label="Lista de Tareas"
        onAction={() => navigation.navigate('TaskList')}
      />
    </View>
  );
};