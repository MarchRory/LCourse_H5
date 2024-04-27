import router from "@/router";
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { showFailToast } from "vant";
import { getToken, tokenKey, removeToken } from "../auth/auth";
import { HttpCustomCodeEnum, Response, errorCodeMap } from "./types";
class HttpRequest {
    private service: AxiosInstance;

    constructor() {
        this.service = axios.create({
            baseURL: import.meta.env.VITE_APP_API_BASE_URL,
            timeout: 5 * 1000 // 默认超时时间5秒
        })
        this.service.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                config.headers = {
                    ...config.headers,
                };
                if (getToken()) {
                    config.headers[tokenKey] = getToken();
                }
                return config;
            },
            (error: AxiosError) => {
                console.log("请求发出时出现异常: ", error);
                return Promise.reject(error);
            }
        )
        this.service.interceptors.response.use(
            (response: AxiosResponse<Response>): AxiosResponse['data'] => {
                const res = response.data
                const { success = true, code, message } = res as Response
                if (!success) {
                    // @ts-ignore
                    showFailToast(message || errorCodeMap[code] || '服务器异常')
                    /**
                     * @description 如果未来自定义code和对应的全局统一处理太多了且很多不同, 建议把这些配置到map里, 然后这里根据code去触发对应的处理方法, 可参考本项目中对Websocket的封装方式
                     */
                    switch (+code) {
                        case HttpCustomCodeEnum.error:
                            // @ts-ignore
                            showFailToast(message || errorCodeMap[code]);
                            break;
                        case HttpCustomCodeEnum.account_expire:
                            showFailToast("登录过期, 请重新登录");
                            removeToken();
                            window.localStorage.clear();
                            setTimeout(() => {
                                router.replace({ path: "/", query: { isLogOut: 1 } });
                            }, 800);
                            break;
                        default:
                            showFailToast('服务器异常')
                            break;
                    }
                    return Promise.reject(res)
                }
                return res
            },
            (error) => {
                return Promise.reject(error);
            },
        )
    }

    /**
     * @description 入口请求方法, 对所有类型请求的统一代理, 以后要封装什么全局增强功能, 在这里进行配置
     * @param config axios完整配置对象
     * @returns 
     */
    private request<T = any>(config: AxiosRequestConfig): Promise<Response<T>> {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.service.request<AxiosResponse<T>>(config) as AxiosResponse['data']
                resolve(res as Response<T>)
            } catch (err) {
                reject(err)
            }
        })
    }
    /**
     * 
     * @param url 接口地址
     * @param params query参数
     * @param otherConfig 可选, axios其他配置
     * @returns 
     */
    get<T = any>(url: string, params?: any, otherConfig?: Omit<AxiosRequestConfig, 'url' | 'params' | 'method'>) {
        return this.request<T>({ url, params, method: 'GET', ...otherConfig })
    }

    /**
     * 
     * @param url 接口地址
     * @param data 请求体
     * @param otherConfig 可选, axios其他配置
     * @returns 
     */
    post<T = any>(url: string, data: any, otherConfig?: Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>) {
        return this.request<T>({ url, data, method: 'POST', ...otherConfig })
    }

    /**
     * 
     * @param url 接口地址
     * @param data 可选, 请求体
     * @param otherConfig 可选, axios其他配置
     * @returns 
     */
    put<T = any>(url: string, data?: any, otherConfig?: Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>) {
        return this.request<T>({ url, data, method: 'PUT', ...otherConfig })
    }
    /**
     * 
     * @param url 接口地址
     * @param deletedIdsObj 需要删除的id的对象, 按照接口中给出的顺序一一对应
     * @param otherConfig 可选, axios其他配置
     * @returns 
     */
    delete<T = any>(url: string, deletedIdsObj?: Record<string, number | string>, otherConfig?: Omit<AxiosRequestConfig, 'url' | 'method'>) {
        const ids: string =
            deletedIdsObj
                ? '/' + Object.values(deletedIdsObj).join('/')
                : ''
        const custom_url = url + ids
        return this.request<T>({ url: custom_url, method: "DELETE", ...otherConfig })
    }
}

const httpRequest = new HttpRequest()

export default httpRequest;