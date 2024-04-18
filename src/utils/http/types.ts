// 和后端约定好接口返回的数据结构
export interface Response<T = any> {
    success: boolean;
    message: string | null;
    code: number | string;
    data: T;
}
