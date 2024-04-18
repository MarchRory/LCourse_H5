import { request } from "@/utils/http/request";
import * as coursesApiType from "../types/courses";
import * as templateType from "../types/comment";

enum API {
  coursePage = "/curriculum/front/selectCoursePage",
  courseDetail = "/curriculum/detail/front",
  joinCouse = "/curriculum/join",
  commentCourse = "/curriculum/courseEvaluate/",
  commentSelf = "/curriculum/selfEvaluation/",
  sign = "/curriculum/attendance/code",
  unReadEvalutionsCnt = "/curriculum/evaluations/count",
  evalutionsList = "/curriculum/evaluations",
  readAllEvalutions = "/curriculum/evaluations/checkAll",
  commenTemplateList = "/curriculum/template/page",
  vocabularyCategory = "/curriculum/wordType/page",
  vocabulary = "/curriculum/word/page"
}

export default {
  /**
   *
   * @param params 一个对象, 包含查询关键词, 页数, 页容量( 前端设定死, 暂定为15 ), 还应该有一个学期id, 后面后端改了再用
   * @returns
   */
  async getCourses(params: coursesApiType.selectCourseParams) {
    params.title = params.title == "" ? null : params.title;
    params.category = params.category == '' ? null : params.category
    return await request.get<coursesApiType.coursesListResultModel>({
      url: API.coursePage,
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
    return await request.get<coursesApiType.coursesItem>({
      url: API.courseDetail + `/${curriculumId}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  /**
   * 报名课程
   * @param curriculumId 
   * @returns 
   */
  async joinCourse(curriculumId: number) {
    return await request.put({
      url: API.joinCouse + `/${curriculumId}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },

  async commentToCourse(data: coursesApiType.commentToCourseObj) {
    data.score *= 2
    return await request.post({
      url: API.commentCourse,
      data,
    });
  },
  async commentToSelf(data: coursesApiType.commentToSelfObj) {
    if (!data.score) {
      data.score = 80 + Math.floor(Math.random() * 10)
    }
    return await request.post({
      url: API.commentSelf,
      data
    })
  },
  /**
   * 签到 { courseId: 课程id, code: 签到码 }
   * @param sign 
   * @returns 
   */
  async sign(sign: coursesApiType.signInfo) {
    return await request.post({
      url: API.sign + `/${sign.courseId}/${sign.code}`,
    });
  },


  /**
   * 获取未读考评信息小红点
   * @returns 
   */
  async getUnreadEvalutionsCnt() {
    return await request.get<number | null>({
      url: API.unReadEvalutionsCnt,
    })
  },

  /**
   * 考评信息回显
   * @param params page, pageSize
   * @returns 
   */
  async getEvalutionsList(params: coursesApiType.page) {
    return await request.get({
      url: API.evalutionsList,
      params
    })
  },

  /**
   * 考评信息全部已读
   * @returns 
   */
  async evaluationsCheckAll() {
    return await request.get({
      url: API.readAllEvalutions,
    })
  },
  /**
   * 获取评价模板
   */
  async getCommentTemplateAPI(params: templateType.templateAndVocabularyListParamsType) {
    return await request.get<templateType.commentTemplateResultModel>({
      url: API.commenTemplateList,
      params
    })
  },
  /**
   * 获取词汇种类
   * @param params 
   * @returns 
   */
  async getVocabularyCategoriesAPI(params: templateType.templateAndVocabularyListParamsType) {
    return await request.get<templateType.vocabularyCategoryResultModel>({
      url: API.vocabularyCategory,
      params
    })
  },
  async getVocabularyListAPI(params: templateType.templateAndVocabularyListParamsType) {
    return await request.get<templateType.vocabularyResultModel>({
      url: API.vocabulary,
      params
    })
  }
};
