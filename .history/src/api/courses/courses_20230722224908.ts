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

    /**
     * 根据id查询课程详情信息
     * @param curriculumId 课程id
     * @returns 
     */
    async getCourseDetail(curriculumId: number) {
        return await request({
            url: `/curriculum/detail/${curriculumId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
}