import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { ButtonComponent } from '../../components/ButtonComponent';
import { styles } from '../../theme/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../navigator/StackNavigation';
import api from '../../../api/api';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParams, 'Register'>;

interface Props {
    navigation: RegisterScreenNavigationProp;
}

export const RegisterScreen = ({ navigation }: Props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Por favor, completa todos los campos');
            return;
        }

        try {
            const response = await api.post('/auth/register', { name, email, password });
            Alert.alert('Éxito', 'Usuario registrado correctamente');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', 'No se pudo registrar el usuario');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
            />
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
            <ButtonComponent onAction={handleRegister} label="Registrarse" />
        </View>
    );
};