import request from "@/utils/http/request";

/**
 * 查询学院列表
 * @param key 
 * @param pageNum 
 * @param pageSize 
 * @returns 
 */
export async function getDepartments(key: string | null, pageNum: number, pageSize: number) {
    return await request({
        url: '/user/department/page',
        method: 'GET',
        params: {
            key, pageNum, pageSize
        }
    })
}