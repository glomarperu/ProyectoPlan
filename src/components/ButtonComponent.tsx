import React from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from '../theme/styles';

interface Props { // se define la interfaz
    onAction: () => void; // se define el tipo de dato que se espera recibir
    label: string; // se define el tipo de dato que se espera recibir
}

export const ButtonComponent = ({ onAction, label }: Props) => { // se exporta el componente
    return ( 
        <Pressable style={styles.button} onPress={onAction}> 
            <Text style={styles.buttonText}>{label}</Text>
        </Pressable>
    );
};