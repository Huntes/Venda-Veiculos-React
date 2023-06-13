import axios from 'axios';
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';

type RequestParams = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    data?: object;
    config?: AxiosRequestConfig;
}

export function useRequest<T = any>({ method, url, data, config }: RequestParams){
    const [response, setResponse] = useState<T | null>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const request = async () => {
            try {
                const res = await axios.request({
                    method,
                    url,
                    data,
                    ...config
                });
                setResponse(res.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        request();
    }, [url, method, data, config]);

    return { response, error, loading };
}
