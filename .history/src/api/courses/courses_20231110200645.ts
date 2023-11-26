import { request } from "@/utils/http/request";
import * as coursesApiType from "../types/courses";
import * as templateType from "../types/comment";
import { vocabularyPagination } from '@/components/templateComment/types'
enum API {
  coursePage = "/curriculum/course/front/page",
  courseDetail = "/curriculum/course/detail/front",
  joinCourse = "/curriculum/signUp",
  commentCourse = "/curriculum/courseEvaluate/",
  commentSelf = "/curriculum/selfEvaluation/",
  sign = "/curriculum/signUp/attendance/code",
  unReadEvaluationCnt = "/curriculum/signUp/evaluations/count",
  evaluationsList = "/curriculum/signUp/evaluations",
  readAllEvaluations = "/curriculum/signUp/evaluations/checkAll",
  commonTemplateList = "/curriculum/template/page",
  vocabularyCategory = "/curriculum/wordType/page",
  vocabulary = "/curriculum/word/page",
}

/**
 *
 * @param params 一个对象, 包含查询关键词, 页数, 页容量( 前端设定死, 暂定为15 ), 还应该有一个学期id, 后面后端改了再用
 * @returns
 */
export async function getCourses(params: coursesApiType.selectCourseParams) {
  params.title = params.title == "" ? null : params.title;
  params.category = params.category == "" ? null : params.category;
  return await request.get<coursesApiType.coursesListResultModel>({
    url: API.coursePage,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    params,
  });
}

/**
 * 根据id查询课程详情信息
 * @param curriculumId 课程id
 * @returns
 */
export async function getCourseDetail(curriculumId: number) {
  return await request.get<coursesApiType.coursesItem>({
    url: API.courseDetail + `/${curriculumId}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
/**
 * 报名课程
 * @param curriculumId
 * @returns
 */
export async function joinCourse(curriculumId: number) {
  return await request.put({
    url: API.joinCourse + `/${curriculumId}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
/**
 * 对课程评价
 * @param data
 * @returns
 */
export async function commentToCourse(data: coursesApiType.commentToCourseObj) {
  data.score *= 2;
  return await request.post({
    url: API.commentCourse,
    data,
  });
}
/**
 * 自我评价
 * @param data
 * @returns
 */
export async function commentToSelf(data: coursesApiType.commentToSelfObj) {
  if (!data.score) {
    data.score = 80 + Math.floor(Math.random() * 10);
  }
  return await request.post({
    url: API.commentSelf,
    data,
  });
}
/**
 * 签到 { courseId: 课程id, code: 签到码 }
 * @param sign
 * @returns
 */
export async function sign(sign: coursesApiType.signInfo) {
  return await request.post({
    url: API.sign + `/${parseInt(sign.courseId as string)}/${sign.code}`,
  });
}

/**
 * 获取未读考评信息小红点
 * @returns
 */
export async function getUnreadEvalutionsCnt() {
  return await request.get<number | null>({
    url: API.unReadEvaluationCnt,
  });
}

/**
 * 考评信息回显
 * @param params page, pageSize
 * @returns
 */
export async function getEvalutionsList(params: coursesApiType.page) {
  return await request.get<coursesApiType.evalutionListResultModel>({
    url: API.evaluationsList,
    params,
  });
}

/**
 * 考评信息全部已读
 * @returns
 */
export async function evaluationsCheckAll() {
  return await request.get({
    url: API.readAllEvaluations,
  });
}
/**
 * 获取评价模板
 */
export async function getCommentTemplateAPI(
  params: templateType.templateListParamsType,
) {
  return await request.get<templateType.commentTemplateResultModel>({
    url: API.commonTemplateList,
    params,
  });
}
/**
 * 获取词汇种类列表
 * @param params
 * @returns
 */
/* export async function getVocabularyCategoriesAPI(
  params: templateType.templateListParamsType,
) {
  return await request.get<templateType.vocabularyCategoryResultModel>({
    url: API.vocabularyCategory,
    params,
  });
} */

/**
 * 获取某类词汇列表
 * @param params
 * @returns
 */
export async function getVocabularyListAPI(
  params: vocabularyPagination
) {
  let { level } = params
  let levelMin = level, levelMax = level
  return await request.get<templateType.vocabularyResultModel>({
    url: API.vocabulary,
    params: { ...params, levelMax, levelMin }
  });
}
