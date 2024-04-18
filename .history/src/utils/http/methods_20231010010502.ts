import service, { AxiosRequestConfig } from "./request";
import { Response } from "./types";
export const request = {
    get<T = any>(config: AxiosRequestConfig): Promise<Response<T>> {
        return service({
            method: 'GET',
            ...config
        })
    },
    post<T = any>(config: AxiosRequestConfig): Promise<Response<T>> {
        return service({
            method: 'POST',
            ...config
        })
    },
    delete<T = any>(config: AxiosRequestConfig): Promise<Response<T>> {
        return service({
            method: 'DELETE',
            ...config
        })
    },
    put: (config: AxiosRequestConfig) => {
        return service({
            method: 'PUT',
            ...config
        })
    }
}