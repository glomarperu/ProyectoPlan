import React from 'react';
import { View} from 'react-native';
import auth from '@react-native-firebase/auth';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../routes/StackNavigation'; // Asegúrate de importar RootStackParams
import { styles } from '../../theme/styles';
import { ButtonComponent } from '../../components/ButtonComponent';

export const ConfigurationScreen = () => { 
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>(); // se crea la navegacion para la pantalla de configuracion

    const logout = async () => { // se crea la funcion de logout
        try { // se crea el try para el logout
            await auth().signOut(); // se crea el logout
            setTimeout(() => { // tiempo de espera
                navigation.dispatch( // se crea la navegacion
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    })
                );
            }, 500); // tiempo de espera de 500 milisegundos
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ButtonComponent onAction={logout} label="Cerrar Sesión" />
        </View>
    );
};