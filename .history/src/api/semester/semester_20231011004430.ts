import { request } from '@/utils/http/request'
enum API {
    semesterNow = "/curriculum/now"
}
export default {
    async getSemesterNow() {
        return await request.get({
            url: API.semesterNow,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
}