import { request } from "@/utils/http/request";
import { departmentResultModel } from "../types/department";
import { Response } from "@/utils/http/types";
import { pageParams } from "../types/public";
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
export async function getDepartments(params: pageParams) {
    return await request.get<Response<departmentResultModel>>({
        url: API.departmentList,
        params
    })
}