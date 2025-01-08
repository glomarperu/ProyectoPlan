import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../routes/StackNavigation';
import { styles } from '../../theme/styles';

export const HomeScreen = () => {  // se exporta la funcion

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>(); // se usa el hook para obtener la navegacion
  const [userName, setUserName] = useState<string | null>(null); // se declara el estado para el nombre de usuario

  useEffect(() => { // se usa el hook para obtener el nombre de usuario
    const currentUser = auth().currentUser; // se obtiene el usuario actual
    if (currentUser) { // si el usuario existe
      setUserName(currentUser.displayName || currentUser.email); // se establece el nombre de usuario
    }
  }, []); // se ejecuta solo una vez al cargar la pantalla

  // eliminos haciones de consola y agrego las funciones del ButtonComponent para ejecutar las vistas
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido: {userName ? userName : 'Usuario'}</Text>
      <View style={styles.cardContainer}>
        <Pressable
          style={[styles.card, { backgroundColor: '#4CAF50' }]}
          onPress={() => navigation.navigate('AddTask')}>
          <Image
            source={require('../../img/add.png')} // Ajusta la ruta a tu imagen
            style={styles.icon} />
          <Text style={styles.cardText}>Agregar Tarea</Text>
        </Pressable>
        <Pressable
          style={[styles.card, { backgroundColor: '#FF9800' }]}
          onPress={() => navigation.navigate('TaskList')}>
          <Image
            source={require('../../img/list.png')} // Ajusta la ruta a tu imagen
            style={styles.icon} />
          <Text style={styles.cardText}>Lista de Tareas</Text>
        </Pressable>
      </View>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Pressable
          style={[styles.card, { alignContent: 'center', backgroundColor: '#FF3840' }]}
          onPress={() => navigation.navigate('Config')}>
          <Image
            source={require('../../img/config.png')} // Ajusta la ruta a tu imagen
            style={styles.icon} />
          <Text style={styles.cardText}>Configuración</Text>
        </Pressable>
      </View>
    </View>
  );
};