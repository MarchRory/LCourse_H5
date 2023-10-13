import service, { AxiosRequestConfig } from "./request";

export const request = {
    get: (options: AxiosRequestConfig) => {
        service({
            method: 'GET',
            ...options
        })
    },
    post: (options: AxiosRequestConfig) => {
        service({
            method: 'POST',
            ...options
        })
    }
}