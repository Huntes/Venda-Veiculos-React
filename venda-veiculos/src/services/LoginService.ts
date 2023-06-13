import axios from 'axios';
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { Login } from '../types/Login';
import { useRequest } from './BaseService';

const headerRequest = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
};

const Login = async (login: Login) => {
    const { response, error, loading } = useRequest({method: 'POST', url: 'https://localhost:5501/api/Login/login', data: login, config: headerRequest})
    return [response, error, loading]
}

const LoginService = {
    Login
}

export default LoginService;