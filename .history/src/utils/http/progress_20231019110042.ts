import { AxiosRequestConfig } from "axios";

// 获取axios接口请求进度
export const uploadProgressOpts: AxiosRequestConfig = {
    onDownloadProgress: function (e) {

    }
}