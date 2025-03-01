import { StyleSheet } from "react-native";

export const colors = {
    primary: '#1d2667', // Color Primario
    dark: 'black', // Color Secundario
    light: '#D2F4FA', // Color Terciario
    danger: '#ff4d4d', // Nuevo color para el botón de eliminar
    white: '#3D656C',      // Color para textos secundarios
    background: '#abd5d5', // Color de fondo

};

export const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        margin: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.light,
        fontSize: 15,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    title: {
        color: colors.primary,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background, // Fondo general
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        width: '100%',
        backgroundColor: 'white',
    },
    linkText: {
        color: colors.primary,
        fontSize: 16,
        marginTop: 10,
        alignItems: 'center',
    },
    //agregado por Imanol
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: colors.dark,
    },
    picker: {
        backgroundColor: colors.light,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    noTasks: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.white,
        marginTop: 50,
    },
    taskItem: {
        backgroundColor: '#E0F7FA',
        padding: 10,
        marginVertical: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    taskName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.dark,
    },
    taskNameSecundario: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.dark,
    },
    taskDescription: {
        fontSize: 14,
        color: colors.white,
        marginTop: 5,
    },
    // creado por Jhon
    deleteButton: {
        backgroundColor: '#F44336', // Rojo para el botón de eliminar
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    logo: {        
        width: 200,
        height: 150,
        marginBottom: 10, // Espacio entre la imagen y el título
        alignSelf: 'center', // Centra la imagen horizontalmente
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10, // Espacio entre tarjetas
    },
    card: {
        width: 150,
        height: 150,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5, // Sombra en Android
    },
    cardText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    icon: {
        width: 90,
        height: 90,
        marginTop: 10,
        marginBottom: 10, // Espacio entre la imagen y el título
        alignSelf: 'center', // Centra la imagen horizontalmente
    },
    editButton: {
        backgroundColor: '#4CAF50', // Verde para diferenciarlo del botón de eliminar
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
});