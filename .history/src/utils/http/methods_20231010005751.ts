import service, { AxiosRequestConfig } from "./request";

export const request = {
    get: (options: AxiosRequestConfig) => {
        service({
            method: 'GET',
            ...options
        })
    }
}