import request from "@/utils/http/request";

export async function getDepartments(key: string | null, pageNum: number, pageSize: number) {
    return await request({
        url: '/user/department/page',
        method: 'GET',
        params: {
            key, pageNum, pageSize
        }
    })
}