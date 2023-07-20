import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import type { Response } from './types';
import { Toast } from 'vant';
import router from '@/router';
import { useUserStore, useUserStore } from '@/store/modules/user';


/**
 *  axios版本: 1.2.0-alpha.1
 *  1.4.0版本用着有些问题不知道怎么解决, 这里就不弄了
 */

const useStore = useUserStore()

axios.defaults.timeout = 1000 * 60;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 创建axios实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
});

// axios实例拦截请求
service.interceptors.request.use(

    (config: AxiosRequestConfig) => {
        if (useUserStore.) {

        }
        config.headers['X-Token'] = token

        config.headers.Authorization = + token
        config.headers = {
            // swpu_token: token
            // ...auth.headers(), // 你的自定义headers，如token等
        };
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// axios实例拦截响应
service.interceptors.response.use(
    // 2xx时触发
    (response: AxiosResponse<Response>) => {
        // response.data就是后端返回的数据，结构根据你们的约定来定义
        const { code, message } = response.data;
        let errMessage = '';
        switch (code) {
            case 0:
                break;
            case 1: // token过期
                errMessage = '本次登录过期, 请重新登陆';
                router.push('/login');
                break;
            case 2: // 无权限
                errMessage = '无访问权限';
                break;
            default:
                errMessage = message;
                break;
        }
        if (errMessage) Toast.fail(errMessage);
        return response;
    },
    // 非2xx时触发
    (error: AxiosError) => {
        Toast.fail('网路异常');
        return Promise.reject(error);
    }
);

export type { AxiosResponse, AxiosRequestConfig };

export default service;
