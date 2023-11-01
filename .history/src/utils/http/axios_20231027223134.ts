import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import { showFailToast } from 'vant';
import { getToken, removeToken } from '../auth/auth';
import router from '../../router/index'
/**
 *  axios版本: 1.2.0-alpha.1
 *  1.4.0版本用着有些问题不知道怎么解决, 这里就不弄了
 */

// 创建axios实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    timeout: 5 * 1000
});
// axios实例拦截请求
service.interceptors.request.use(

    (config: AxiosRequestConfig) => {
        config.headers = {
            ...config.headers,
        };
        if (getToken()) {
            config.headers['swpu_token'] = getToken()
        }
        return config;
    },
    (error: AxiosError) => {
        console.log('err: ', error)
        return Promise.reject(error);
    }
);

// axios实例拦截响应
service.interceptors.response.use(
    // 2xx时触发
    (response: any) => {
        // response.data就是后端返回的数据
        const { code, message } = response.data;
        switch (code) {
            case 200:     // 成功码200
                break;
            case 250:     // 判断token过期的code是? 
                showFailToast(message)
                break;
            case 100: // 请求重定向
                showFailToast('登录过期, 请重新登录')
                removeToken()
                window.localStorage.clear()
                setTimeout(() => {
                    router.replace({ path: '/', query: { isLogOut: 1 } });
                }, 800)
                break;
            default:
                break;
        }
        return response.data;
    },
    // 非2xx时触发
    (error: AxiosError) => {
        showFailToast('网络异常');
        return Promise.reject(error);
    }
);
export type { AxiosResponse, AxiosRequestConfig };
export default service;