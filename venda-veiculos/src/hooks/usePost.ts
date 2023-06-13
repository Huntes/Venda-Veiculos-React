import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from '../../node_modules/axios/index';

export function usePost<T = any>(url: string, databody: T, options?: AxiosRequestConfig){
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        (async () => {
            try {
                axios.post(url, databody, options).then(response => {
                    setData(data)
                });
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        })();
    }, [url]);

    return { data, loading, error };
}