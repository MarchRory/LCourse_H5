import { request } from "@/utils/http/request";
import { departmentResultModel } from "../types/department";
import { Response } from "@/utils/http/types";
enum API {
    departmentList = "/user/department/page"
}

/**
 * 查询学院列表
 * @param key 
 * @param pageNum 
 * @param pageSize 
 * @returns 
 */
export async function getDepartments(key: string | null, pageNum: number, pageSize: number) {
    return await request.get<Response<departmentResultModel>>({
        url: API.departmentList,
        params: {
            key, pageNum, pageSize
        }
    })
}