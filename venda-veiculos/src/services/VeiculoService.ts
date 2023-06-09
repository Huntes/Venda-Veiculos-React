import { Car } from '../types/Car';
import axios from 'axios';

const token = localStorage.getItem('token');

const sendRequest = async<T = any>(method: string, url: string, data?: T, config?: any) => {
    try {
      const res = await axios.request({
        method,
        url,
        data,
        ...config
      });
      return { response: res.data, error: null, loading: false };
    } catch (error) {
        return { response: null, error, loading: false };
    } 
};

const headerSendRequest = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${token}`
    }
}; 

const headerGetRequest = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
};

const GetAll = async () => {
   
    return sendRequest<Car[]>('GET', `${import.meta.env.VITE_API_URL}/api/Vehicles/getAll`, undefined, headerGetRequest);
}

const Get = async (id: string) => {
    
    return await sendRequest<Car>('GET', `${import.meta.env.VITE_API_URL}/api/Vehicles/get/${id}`, undefined, headerGetRequest);
}

const Insert = async (car: Car) => {
   
    return await sendRequest<Car>('POST', `${import.meta.env.VITE_API_URL}/api/Vehicles/insert-car`, car, headerSendRequest);
}

const Update = async (id: string, car: Car) => {
   
    return await sendRequest<Car>('PUT', `${import.meta.env.VITE_API_URL}/api/Vehicles/update/${id}`, car, headerSendRequest);
}

const ToggleCar = async (id: string) => {
    
    return await sendRequest('PUT', `${import.meta.env.VITE_API_URL}/api/Vehicles/change-status/${id}`, undefined, headerSendRequest);
}

const Delete = async (id: string) => {
    
    return await sendRequest('DELETE', `${import.meta.env.VITE_API_URL}/api/Vehicles/delete/${id}`, null, headerSendRequest);
}

//Cria um objeto que contém as funções de acesso ao backend
const VeiculoService = {
    GetAll,
    Get,
    Insert,
    Update,
    ToggleCar,
    Delete
}

//Exporta o objeto para ser usado em outros arquivos
export default VeiculoService;