import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: 'http://192.168.1.35:5000/api', // URL del backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token JWT a las solicitudes
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token'); // Obtén el token del almacenamiento local
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Agrega el token al encabezado
    }
    return config;
});

export default api;