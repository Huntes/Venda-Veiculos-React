import { useRequest } from './BaseService';
import { Arquivo } from '../types/Arquivo';
import { useState } from 'react';
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

const UploadFile = async (file: Arquivo) => {
    return await sendRequest('POST', 'https://localhost:5501/api/File/upload', file, headerSendRequest);
}

const UploadFiles = async (files: Arquivo[]) => {
    return await sendRequest('POST', 'https://localhost:5501/api/File/upload-files', files, headerSendRequest);
}

const Get = async (id: string) => {
    return await sendRequest('GET', `https://localhost:5501/api/File/get/${id}`, null, headerGetRequest);
}

const Delete = async (id: string) => {
    return await sendRequest('DELETE', `https://localhost:5501/api/Arquivo/delete/${id}`, null, headerSendRequest);
}

const ArquivoService = {
    UploadFile,
    UploadFiles,
    Get,
    Delete
}

export default ArquivoService;