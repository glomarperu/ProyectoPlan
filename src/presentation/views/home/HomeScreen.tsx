import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../navigator/StackNavigation';
import { styles } from '../../theme/styles';
import { ButtonComponent } from '../../components/ButtonComponent';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParams, 'Home'>;

interface Props {
    navigation: HomeScreenNavigationProp;
}

export const HomeScreen = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido</Text>
            <Pressable
                style={[styles.button, { backgroundColor: '#4CAF50' }]}
                onPress={() => navigation.navigate('AddTask')}
            >
            <Image 
                source={require('../../img/add.png')} 
                style={styles.icon}
                />
                <Text style={styles.buttonText}>Agregar Tarea</Text>
            </Pressable>
            <Pressable
                style={[styles.button, { backgroundColor: '#FF9800' }]}
                onPress={() => navigation.navigate('TaskList')}
            >
            <Image 
                source={require('../../img/list.png')} 
                style={styles.icon}
                />
                <Text style={styles.buttonText}>Lista de Tareas</Text>
            </Pressable>
            <Pressable
                style={[styles.button,{alignContent:'center',backgroundColor: '#FF3840' }]}
                onPress={() => navigation.navigate('Config')}
            >
            <Image 
                    source={require('../../img/config.png')}
                    style={styles.icon}
                />
                <Text style={styles.buttonText}>Configuración</Text>
            </Pressable>
        </View>
    );
};