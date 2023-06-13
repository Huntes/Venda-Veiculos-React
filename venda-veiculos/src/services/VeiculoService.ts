import axios from 'axios';
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { Car } from '../types/Car';
import { useRequest } from './BaseService';

const token = localStorage.getItem('token');

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
    const { response, error, loading } = useRequest<Car[]>({method: 'GET', url: 'https://localhost:5501/api/Vehicles/getAll', data: undefined, config: headerGetRequest})
    return [response, error, loading]
}

const Get = async (id: string) => {
    const { response, error, loading } = useRequest({method: 'GET', url: `https://localhost:5501/api/Vehicles/get/${id}`, data: undefined, config: headerGetRequest})
    return [response, error, loading]
}

const Insert = async (car: Car) => {
    const { response, error, loading } = useRequest({method: 'POST', url: 'https://localhost:5501/api/Vehicles/insert-car', data: car, config: headerSendRequest})
    return [response, error, loading]
}

const Update = async (id: string, car: Car) => {
    const { response, error, loading } = useRequest({method: 'PUT', url: `https://localhost:5501/api/Vehicles/update/${id}`, data: car, config: headerSendRequest})
    return [response, error, loading]
}

const ToggleCar = async (id: string) => {
    const { response, error, loading } = useRequest({method: 'PUT', url: `https://localhost:5501/api/Vehicles/change-status/${id}`, data: undefined, config: headerSendRequest})
    return [response, error, loading]
}

const Delete = async (id: string) => {
    const { response, error, loading } = useRequest({method: 'DELETE', url: `https://localhost:5501/api/Vehicles/delete/${id}`, data: undefined, config: headerSendRequest})
    return [response, error, loading]
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