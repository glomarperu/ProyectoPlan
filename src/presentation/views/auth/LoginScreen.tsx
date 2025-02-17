import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../navigator/StackNavigation';
import { ButtonComponent } from '../../components/ButtonComponent';
import { styles } from '../../theme/styles';
import api from '../../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParams, 'Login'>;

interface Props {
    navigation: LoginScreenNavigationProp;
}

export const LoginScreen = ({ navigation }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor, ingresa tu correo y contraseña');
            return;
        }
        try {
            const response = await api.post('/auth/login', { email, password });
            const token = response.data.token;
            await AsyncStorage.setItem('token', token); // Guarda el token en AsyncStorage
            Alert.alert('Éxito', 'Inicio de sesión exitoso');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            Alert.alert('Error', 'Credenciales inválidas');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <ButtonComponent onAction={handleLogin} label="Iniciar Sesión" />
            <Pressable onPress={() => navigation.navigate('Register')}>
                <Text style={styles.linkText}>Registrarse</Text>
            </Pressable>
        </View>
    );
};