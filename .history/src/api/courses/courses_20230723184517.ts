import request from '@/utils/http/request'

interface selectCourseParams {
    keyWords: string,
    pageNum: number,
    pageSize: number
}  // 后面还要补一个semsesterId

export default {

    /**
     * 
     * @param params 一个对象, 包含查询关键词, 页数, 页容量( 前端设定死, 暂定为15 ), 还应该有一个学期id, 后面后端改了再用
     * @returns 
     */
    async getCourses(params: selectCourseParams) {
        let api = `?title=${params.keyWords}&pageNum=${params.pageNum}&pageSize=${params.pageSize}`
        return await request({
            url: '/curriculum/selectCoursePage' + api,
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
    },

    async joinCourse(curriculumId: number) {
        return await request({
            url: `/curriculum/join/${curriculumId}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
}