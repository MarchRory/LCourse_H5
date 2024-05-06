import request from "@/utils/http/request";
import * as coursesApiType from "../types/courses";
import * as templateType from "../types/comment";
import { vocabularyPagination } from '@/components/templateComment/types'
import { ListResponseModel, pageParams } from "../types/public";
import { DimensionCommentItem } from "../dimension";
import { AddPointData, PointItem } from "../types/user";
import { coursesItem } from "../types/courses";
enum API {
  coursePage = "/curriculum/course/front/page",
  courseDetail = "/curriculum/course/detail/front",
  joinCourse = "/curriculum/course/join",
  commentCourse = "/curriculum/courseEvaluate",
  commentSelf = "/curriculum/selfEvaluation/",
  sign = "/curriculum/signUp/attendance/code",
  unReadEvaluationCnt = "/curriculum/signUp/evaluations/count",
  evaluationsList = "/curriculum/signUp/evaluations",
  readAllEvaluations = "/curriculum/signUp/evaluations/checkAll",
  commonTemplateList = "/curriculum/template/page",
  vocabularyCategory = "/curriculum/wordType/page",
  vocabulary = "/curriculum/word/page",
  topics = "/curriculum/courseEvaluate/topic/"
}

/**
 *
 * @param data 一个对象, 包含查询关键词, 页数, 页容量( 前端设定死, 暂定为15 ), 还应该有一个学期id, 后面后端改了再用
 * @returns
 */
export function getCourses(data: coursesApiType.selectCourseParams) {
  data.title = data.title == "" ? null : data.title;
  return request.post<ListResponseModel<coursesItem>>(
    API.coursePage,
    data
  );
}

/**
 * 根据id查询课程详情信息
 * @param curriculumId 课程id
 * @returns
 */
export function getCourseDetail(curriculumId: number) {
  return request.get<coursesApiType.coursesItem>(
    API.courseDetail + `/${curriculumId}`,
    null,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    }
  );
}
/**
 * 报名课程
 * @param curriculumId
 * @returns
 */
export function joinCourse(curriculumId: number) {
  return request.put(
    API.joinCourse + `/${curriculumId}`,
    null,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    }

  );
}
/**
 * 对课程评价
 * @param data
 * @returns
 */
export function commentToCourse(
  data: coursesApiType.commentToCourseObj,
  params: {} | Pick<PointItem, 'point' | 'type'> & { departmentId: string, origin: string }
) {
  data.score *= 2;
  return request.post(
    API.commentCourse,
    data,
    { params: { ...params } }
  );
}
/**
 * 自我评价
 * @param data
 * @returns
 */
export function commentToSelf(data: coursesApiType.commentToSelfObj) {
  if (!data.score) {
    data.score = 80 + Math.floor(Math.random() * 10);
  }
  return request.post(
    API.commentSelf,
    data,
  );
}

/**
 * 签到 { courseId: 课程id, code: 签到码 }
 * @param sign
 * @returns
 */
export function sign(sign: coursesApiType.signInfo, data: AddPointData) {
  return request.post(
    API.sign + `/${parseInt(sign.courseId as string)}/${sign.code}`,
    data
  );
}

/**
 * 获取未读考评信息小红点
 * @returns
 */
export function getUnreadEvalutionsCnt() {
  return request.get<number | null>(
    API.unReadEvaluationCnt,
    null
  );
}

/**
 * 考评信息回显
 * @param params page, pageSize
 * @returns
 */
export function getEvalutionsList(params: coursesApiType.page) {
  return request.get<coursesApiType.evalutionListResultModel>(
    API.evaluationsList,
    params,
  );
}

/**
 * 考评信息全部已读
 * @returns
 */
export function evaluationsCheckAll() {
  return request.get(
    API.readAllEvaluations,
  );
}
/**
 * 获取评价模板
 */
export function getCommentTemplateAPI(
  params: templateType.templateListParamsType,
) {
  return request.get<templateType.commentTemplateResultModel>(
    API.commonTemplateList,
    params,
  );
}
/**
 * 获取词汇种类列表
 * @param params
 * @returns
 */
/* export  function getVocabularyCategoriesAPI(
  params: templateType.templateListParamsType,
) {
  return  request.get<templateType.vocabularyCategoryResultModel>({
    url: API.vocabularyCategory,
    params,
  });
} */

/**
 * 获取某类词汇列表
 * @param params
 * @returns
 */
export function getVocabularyListAPI(
  params: vocabularyPagination
) {
  let { level } = params
  let levelMin = level, levelMax = level
  return request.get<templateType.vocabularyResultModel>(
    API.vocabulary,
    { ...params, levelMax, levelMin }
  );
}

/**
 * 获取课程评价主题列表
 * @param departmentId 
 * @returns 
 */
export function getCommentTopics(departmentId: number | string) {
  return request.get<ListResponseModel<DimensionCommentItem>>(API.topics, { page: 1, pageSize: 50, key: '', departmentId })
}
