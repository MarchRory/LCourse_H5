import { request } from "@/utils/http/request";
import { useUserStore } from "@/store/modules/user";
enum API {
  objectiveDetail = '/curriculum/objectivesDetails/'
}
const userStore = useUserStore();

/**
 * 获取学生本学期课程目标列表
 * @returns 
 */
export async function getUserObjects() {
  return await request.get({
    url: `/curriculum/front/page?pageNum=1&pageSize=100&semesterId=${userStore.semesterId}&userType=0`,
  });
}

/**
 * 获取课程规划详情
 * @param objId 选定的课程目标Id
 * @returns data.
 */
export async function getObjDetail(objId: number) {
  return await request.get({
    url: API.objectiveDetail + objId,
  });
}

/**
 *获取目标下绑定的课程列表
 * @param objId
 * @returns data.list -> 选定目标下的课程列表, data.total -> 选定课程目标下课程的总数
 */
export async function getObjCourses(objId: number) {
  return await request.get({
    url: `/curriculum/item/page/${objId}?pageNum=1&pageSize=50`,
  });
}

/**
 * 获取学生指定学期的课程目标 * @param data 
 * @returns 
 */
export async function getObjects(data: {
  pageNum: number;
  pageSize: number;
  semesterId?: number | string;
  userType: number;
}) {
  return await request.get({
    url: `/curriculum/front/page`,
    data,
  });
}
