import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import {useUserStore} from '@/store/user'
import router from '@/router'

const service: AxiosInstance = axios.create({
    timeout: 50000,
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    withCredentials: true,
    headers: {
      'content-type':'multipart/form-data',
    },
});

const userStore = useUserStore()
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = userStore.userInfo.token
      console.log('sss',userStore.userInfo)
      if (token) {
        config.headers.token = token;
      }
        return config;
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            if(response.data.code ==1){
                router.push('/login')
                return
            }
            return response.data;
        } else {
            Promise.reject();
        }
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
