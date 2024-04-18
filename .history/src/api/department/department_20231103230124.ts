import { request } from "@/utils/http/request";
import { departmentResultModel } from "../types/department";
import { Response } from "@/utils/http/types";
import { majorPageParmas, pageParams } from "../types/public";
enum API {
  departmentList = "/user/department/page",
  majorList = '/user/major/page'
}

/**
 * 查询学院列表
 * @returns
 * @param params
 */
export async function getDepartments(params: pageParams) {
  return await request.get<Response<departmentResultModel>>({
    url: API.departmentList,
    params,
  });
}

export async function getMajorList(params: majorPageParmas) {
  return await request.get<Response<majorResultModel>>({
    url: API.majorList,
    params
  })
}
