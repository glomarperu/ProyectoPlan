import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../theme/styles';
import { ButtonComponent } from '../../components/ButtonComponent';

export const HomeScreen = () => {

  const handleLogout = () => {
    console.log('Agregar tarea');    
  };

  const handleAddTask = () => {
    console.log('Agregar tarea');
  };

  const handleTaskList = () => {
    console.log('Lista de tareas');
  };

  return (
    <View>
      <Text style={styles.title}>Bienvenido</Text>
      <ButtonComponent onAction={handleLogout} label="Cerrar Sesión" />
      <ButtonComponent onAction={handleAddTask} label="Agregar Tarea" />
      <ButtonComponent onAction={handleTaskList} label="Lista de Tareas" />
    </View>
  );
};