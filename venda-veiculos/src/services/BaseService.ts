import axios from 'axios';
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';

type RequestParams = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    data?: object;
    config?: AxiosRequestConfig;
}

// export function useRequest<T = any>({ method, url, data, config }: RequestParams){

    
//         const request = async () => {
//             try {
//                 const res = await axios.request({
//                     method,
//                     url,
//                     data,
//                     ...config
//                 });
//             } catch (error) {
//             } finally {
//             }
//         }

//     return { response, error, loading };
// }
