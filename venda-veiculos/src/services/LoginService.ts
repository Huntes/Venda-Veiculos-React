import axios from 'axios';
import { Login } from '../types/Login';
import { useState } from 'react';

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


const headerRequest = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
};

const Login = async (login: Login) => {
    return await sendRequest('POST', `${import.meta.env.VITE_API_URL}/api/Login/login`, login, headerRequest);
}

const LoginService = {
    Login
}

export default LoginService;