import request from "@/utils/http/request";
import * as userApiTypes from "../types/user";
import { TombstoneGeneratedFields, pageParams } from "../types/public";
enum API {
  login = "/user/login",
  logOut = "/user/logout",
  getUserInfoBySysToken = "/user/info?type=0",
  getStuInfoBySysToken = "/user/student/user",
  resetPassword = "/user/password",
  updateUserInfo = "/user/student/by/student",
  flag = '/user/flag'
}
/**
 * @param 一个对象，{ username, password }
 * @returns swpu_token
 */
export function login(data: userApiTypes.loginParams) {
  return request.post(
    API.login,
    data,
  );
}
/**
 *
 */

// 易班授权登录跳转到授权登录页
export function yibanLogin() {
  return (window.location.href =
    import.meta.env.VITE_APP_API_BASE_URL +
    `/user/yiban/login?callback=${import.meta.env.VITE_APP_REDIRECT_PATH}`);
}


// 账号与易班账号绑定
export function yibanBind(uid: number) {
  window.location.href =
    import.meta.env.VITE_APP_API_BASE_URL +
    "/user/yiban/bind?id=" +
    uid +
    "&callback=" +
    import.meta.env.VITE_APP_YIBANBIND_CALLBACK;
}

/**
 * 通过token获取用户信息
 * @returns
 */
export function getInfo(token: string) {
  return Promise.all([
    request.get<userApiTypes.getInfoByTokenResultModel>(
      API.getUserInfoBySysToken,
      { token },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          swpu_token: token,
        }
      }

    ),
    request.get<userApiTypes.getInfoByStuIdResultModel>(
      API.getStuInfoBySysToken,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          swpu_token: token,
        }
      }
    ),
  ]);
}
export function logOut() {
  return request.get(
    API.logOut,
    null,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    }
  );
}

/**
 * 重置密码
 * @param data { newPassword: string; oldPassword: string }
 * @returns
 */
export function resetPassword(data: {
  newPassword: string;
  oldPassword: string;
}) {
  return request.post(
    API.resetPassword,
    data,
  );
}
/**
 * 更新用户个人信息
 * @param data
 * @returns
 */
export function updateUser(data: {
  id: string | number;
  nickname: string;
  avatar: string;
  sex: number;
  departmentId: number;
  department: string;
  contact: any;
  enrollmentYear: number;
}) {
  return request.put<null>(
    API.updateUserInfo,
    data,
  );
}

/**
 * flag 状态枚举
 */
export enum FlagStateEnum {
  beforeStart = 1,
  ing = 2,
  complete = 3,
  fail = 4
}

export interface FlagItem extends TombstoneGeneratedFields {
  state: number;
  content: string;
  comments: string
}
/**
 * 创建flag
 * @param data 
 * @returns 
 */
export function addFlagApi(content: string) {
  return request.post(
    API.flag,
    {
      state: FlagStateEnum.beforeStart,
      content,
      comments: ''
    }
  )
}

/**
 * 分页查询flag
 * @param params 
 * @returns 
 */
export function getFLagListApi(params: Omit<pageParams, 'page'>) {
  return request.get(
    API.flag + '/page',
    params
  )
}