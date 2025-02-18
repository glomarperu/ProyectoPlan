import React from 'react';
import { View, Alert } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from '../../theme/styles';
import { ButtonComponent } from '../../components/ButtonComponent';
import { RootStackParams } from '../../navigator/StackNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ConfigurationScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const logout = async () => {
        try {
           
            await AsyncStorage.removeItem('token');
            
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
            );
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            Alert.alert('Error', 'No se pudo cerrar sesión');
        }
    };

    return (
        <View style={styles.container}>
            <ButtonComponent onAction={logout} label="Cerrar Sesión" />
        </View>
    );
};