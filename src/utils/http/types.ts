// 和后端约定好接口返回的数据结构
export interface Response<T = any> {
    success: boolean;
    message: string | null;
    code: number;
    data: T;
}


export const enum HttpCustomCodeEnum {
    success = 200,
    error = 250,
    account_expire = 100
}

type ErrorCodeMap = {
    [key in HttpCustomCodeEnum]: string
}

export const errorCodeMap: ErrorCodeMap = {
    [HttpCustomCodeEnum.success]: '请求成功',
    [HttpCustomCodeEnum.error]: '服务器异常',
    [HttpCustomCodeEnum.account_expire]: '登录过期'
}