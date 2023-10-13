import { request } from '@/utils/http/request';
import * as userApiTypes from '../types/user';
export interface loginParams {
  username: string;
  password: string;
}
enum API {
  login = "/user/login",
  logOut = "/user/logout",
  getUserInfoBySysToken = "/user/info?type=0",
  getStuInfoBySysToken = "/user/student/user",
  userEvalutionsMsgCnt = "/curriculum/evaluations/count",
  resetPassword = "/user/password",
  updateUserInfo = "/user/student/by/student"
}
export default {
  /**
   * @param 一个对象，{ username, password }
   * @returns swpu_token
   */
  async login(data: loginParams) {
    return await request.post({
      url: API.login,
      data,
    });
  },
  /**
   *
   */
  async yibanLogin() {
    return (window.location.href =
      import.meta.env.VITE_APP_API_BASE_URL +
      `/user/yiban/login?callback=${import.meta.env.VITE_APP_REDIRECT_PATH}`);
  },

  async yibanBind(uid: number) {
    window.location.href = import.meta.env.VITE_APP_API_BASE_URL + '/user/yiban/bind?id=' + uid + '&callback=' + import.meta.env.VITE_APP_YIBANBIND_CALLBACK
  },

  /**
   * 通过token获取用户信息
   * @returns
   */
  async getInfo(token: string) {
    return await Promise.all([
      request.get<userApiTypes.getInfoByTokenResultModel>({
        url: API.getUserInfoBySysToken,
        params: { token },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
      request.get<userApiTypes.getInfoByStuIdResultModel>({
        url: API.getStuInfoBySysToken,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          swpu_token: token,
        },
      }),
    ]);
  },
  async getBudge() {
    return await request.get({
      url: API.userEvalutionsMsgCnt,
    })
  },
  async logOut() {
    return await request.get({
      url: API.logOut,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  async resetPassword(data: { newPassword: string; oldPassword: string }) {
    return await request.post({
      url: API.resetPassword,
      data: data,
    });
  },
  async updateUser(data: {
    id: string | number;
    nickname: string;
    avatar: string;
    sex: number,
    departmentId: number,
    department: string,
    contact: any,
    enrollmentYear: number
  }) {
    return request.put({
      url: API.updateUserInfo,
      data,
    });
  },
};