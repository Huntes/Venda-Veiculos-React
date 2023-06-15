import axios from 'axios';
import { Usuario } from '../types/Usuario';
import { useRequest } from './BaseService';
import { useState } from 'react';

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

const GetById = async (id: string) => {
    
    return await sendRequest('GET', `https://localhost:5501/api/User/get/${id}`, null, headerGetRequest);
    
}

const Create = async (user: Usuario) => {
    return await sendRequest('POST', 'https://localhost:5501/api/User/insert', user, headerSendRequest);
}

const Update = async (id: string, user: Usuario) => {

    return await sendRequest('PUT', `https://localhost:5501/api/User/update/${id}`, user, headerSendRequest);
}

const UsuarioService = {
    GetById,
    Create,
    Update
}

export default UsuarioService;