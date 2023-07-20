// 和后端约定好接口返回的数据结构
export interface Response<T = any> {
    code: number | string;
    message: string | null;
    data: T;
    success: boolean;
    status?: boolean,
    statusText?: string | null,
    headers?: object,
}
