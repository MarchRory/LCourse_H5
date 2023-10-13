import { request } from "@/utils/http/request";

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
    return await request.get({
        url: API.departmentList,
        params: {
            key, pageNum, pageSize
        }
    })
}