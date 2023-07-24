import request from '@/utils/http/request'

interface selectCourseParams {
    key: string,
    pageNum: number,
    pageSize: number
}  // 后面还要补一个semsesterId

export default {
    async getCourses(params: selectCourseParams) {
        return await request({
            url: `/curriculum/selectCoursePage?title=${params.key}&pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },

    async getCourseDetail(curriculumId: number) {
        return await request({
            url: `/curriculum/detail/${curriculumId}`
        })
    }
}