import request from '@/utils/http/request'

interface selectCourseParams {
    title: string,       // 课程名关键字, 用于输入框搜索
    category: string,    // 课程标签关键字, 用于首页按照标签查找
    pageNum: number,
    pageSize: number,
    semesterId: number,  // 学期id
    userId: number,      // userId
    state: number,       // 课程状态,   0->全部,  1->筹备中, 2->报名中， 3->进行中, 4->已结束
    reviewed: number     // 查询全部

}  // 后面还要补一个semsesterId

export default {

    /**
     * 
     * @param params 一个对象, 包含查询关键词, 页数, 页容量( 前端设定死, 暂定为15 ), 还应该有一个学期id, 后面后端改了再用
     * @returns 
     */
    async getCourses(params: selectCourseParams) {
        return await request({
            url: '/curriculum/selectCoursePage',
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: {

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