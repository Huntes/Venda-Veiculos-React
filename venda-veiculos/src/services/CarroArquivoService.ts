import { CarroArquivo } from '../types/CarroArquivo';
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

const Insert = async (carroArquivo: CarroArquivo) => {
    return await sendRequest('POST', `${import.meta.env.VITE_API_URL}/api/FileVehicles/insert`, carroArquivo, headerSendRequest);
}

const InsertFiles = async (carroArquivos: CarroArquivo[]) => {
    return await sendRequest('POST', `${import.meta.env.VITE_API_URL}/api/FileVehicles/insert-files`, carroArquivos, headerSendRequest);
}

const CarroArquivoService = {
    Insert,
    InsertFiles
}

export default CarroArquivoService;