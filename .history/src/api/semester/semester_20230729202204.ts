import request from '@/utils/http/request'
export default {
    async getSemesterNow() {
        return await request({
            url: '/curriculum/now',
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
}