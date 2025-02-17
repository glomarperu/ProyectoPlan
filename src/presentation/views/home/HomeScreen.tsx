import React from 'react';
import { View, Text, Pressable } from 'react-native';
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
                style={styles.button}
                onPress={() => navigation.navigate('AddTask')}
            >
                <Text style={styles.buttonText}>Agregar Tarea</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate('TaskList')}
            >
                <Text style={styles.buttonText}>Lista de Tareas</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate('Config')}
            >
                <Text style={styles.buttonText}>Configuración</Text>
            </Pressable>
        </View>
    );
};