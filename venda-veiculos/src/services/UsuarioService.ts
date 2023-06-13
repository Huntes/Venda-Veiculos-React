import axios from 'axios';
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { Usuario } from '../types/Usuario';
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

const GetById = async (id: string) => {
    const { response, error, loading } = useRequest({method: 'GET', url: `https://localhost:5501/api/User/get/${id}`, data: undefined, config: headerGetRequest})
    return [response, error, loading]
}

const Create = async (user: Usuario) => {
    const { response, error, loading } = useRequest({method: 'POST', url: 'https://localhost:5501/api/User/insert', data: user, config: headerGetRequest})
    return [response, error, loading]
}

const Update = async (id: string, user: Usuario) => {
    const { response, error, loading } = useRequest({method: 'PUT', url: `https://localhost:5501/api/User/update/${id}`, data: user, config: headerSendRequest})
    return [response, error, loading]
}

const UsuarioService = {
    GetById,
    Create,
    Update
}

export default UsuarioService;