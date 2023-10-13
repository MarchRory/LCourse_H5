import request from "@/utils/http/request";
import { templateType } from "../types/courses";

export default {
  /**
   *
   * @param params 一个对象, 包含查询关键词, 页数, 页容量( 前端设定死, 暂定为15 ), 还应该有一个学期id, 后面后端改了再用
   * @returns
   */
  async getCourses(params: selectCourseParams) {
    params.title = params.title == "" ? null : params.title;
    params.category = params.category == '' ? null : params.category
    return await request({
      url: "/curriculum/front/selectCoursePage",
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params,
    });
  },

  /**
   * 根据id查询课程详情信息
   * @param curriculumId 课程id
   * @returns
   */
  async getCourseDetail(curriculumId: number) {
    return await request({
      url: `/curriculum/detail/front/${curriculumId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  async joinCourse(curriculumId: number) {
    return await request({
      url: `/curriculum/join/${curriculumId}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },

  async commentToCourse(data: commentToCourseObj) {
    data.score *= 2
    return await request({
      url: "/curriculum/courseEvaluate/",
      method: "POST",
      data,
    });
  },
  async commentToSelf(data: commentToSelfObj) {
    if (!data.score) {
      data.score = 80 + Math.floor(Math.random() * 10)
    }
    return await request({
      url: '/curriculum/selfEvaluation/',
      method: 'POST',
      data
    })
  },


  async sign(signInfo: signInfo) {
    return await request({
      url: `/curriculum/attendance/code/${signInfo.courseId}/${signInfo.code}`,
      method: "POST",
    });
  },


  /**
   * 获取未读考评信息小红点
   * @returns 
   */
  async getUnreadEvalutionsCnt() {
    return await request({
      url: '/curriculum/evaluations/count',
      method: 'GET'
    })
  },

  /**
   * 考评信息回显
   * @param params page, pageSize
   * @returns 
   */
  async getEvalutionsList(params: page) {
    return await request({
      url: '/curriculum/evaluations',
      method: 'GET',
      params
    })
  },

  /**
   * 考评信息全部已读
   * @returns 
   */
  async evaluationsCheckAll() {
    return await request({
      url: '/curriculum/evaluations/checkAll',
      method: 'GET'
    })
  },
  /**
   * 获取评价模板
   */
  async getCommentTemplateAPI(params: templateType) {
    return await request({
      url: '/curriculum/template/page',
      method: 'GET',
      params: params
    })
  }
};
