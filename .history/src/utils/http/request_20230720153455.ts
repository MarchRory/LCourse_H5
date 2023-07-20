import axios, { AxiosResponse, AxiosError } from 'axios';
import type { Response } from './types';
import { Toast } from 'vant';
import router from '@/router';
import { useUserStore } from '@/store/modules/user';
import { getToken } from '../auth/auth';


/**
 *  axios版本: 1.2.0-alpha.1
 *  1.4.0版本用着有些问题不知道怎么解决, 这里就不弄了
 */

const useStore = useUserStore()

// 创建axios实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    timeout: 5 * 1000
});

// axios实例拦截请求
service.interceptors.request.use(

    (config: any) => {
        if (useStore.token) {
            config.headers['swpu_token'] = getToken()
        }
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
    (response: any) => {
        // response.data就是后端返回的数据
        const { code, message } = response.data;
        let errMessage = '';
        switch (code) {
            case 200:   // 成功码200
                break;
            case 1:     // 判断token过期的方法是? 
                errMessage = '本次登录过期, 请重新登陆';
                router.push('/login');
                break;
            default:
                errMessage = message;
                break;
        }
        if (errMessage) Toast.fail(errMessage);
        return response.data;
    },
    // 非2xx时触发
    (error: AxiosError) => {
        Toast.fail('网路异常');
        return Promise.reject(error);
    }
);

export default service;
