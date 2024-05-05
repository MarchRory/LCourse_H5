import { defineStore } from "pinia";
import { getToken, setToken, removeToken } from "@/utils/auth/auth";
import { useWsStore } from "../ws";
import { useRouterCacheStore } from "@/store/modules/routerCache/index";
import { logOut } from "@/api/user/user";
import router from "@/router";
import { CateGoryScore } from "@/api/types/public";
import { getUserCateGoryScore } from "@/api/plan";

interface badge {
  hasEvaluateUnRead: boolean
}

export interface userInfo extends badge {
  token: string | null;
  realName: String | null;  // 真名
  name: string | null;      // 网名
  sex: number | null;
  studentId: string | null; // 学号
  hasBind: boolean,         // 是否绑定易班
  userId: string | null;       // 报名时候用的这个id
  avatar: string | null;
  enrollmentYear: string | null; // 入学年份
  contact: object | null;       // 联系方式
  semesterId: number | null;     // 当前学期的ID
  semesterName: string | null;    // 当前学期名
  departmentId: string | null;
  department: string | null;
  major: string | null;          // 专业
  campus: string | null;            // 校区地点, 例如成都
  EvaluationsCnt: number;
  cateGoryScore: CateGoryScore[]
}

export const useUserStore = defineStore("userInfo", {
  state: (): userInfo => {
    return {
      token: getToken(),
      realName: null,
      name: null,
      studentId: null, //学号
      avatar: null,
      hasBind: false,
      userId: null,
      enrollmentYear: null,
      sex: null,
      contact: null,
      semesterId: null,
      hasEvaluateUnRead: false,
      semesterName: null,
      departmentId: null,
      department: null,
      major: null,
      campus: null,
      EvaluationsCnt: 0,
      cateGoryScore: []
    };
  },
  actions: {
    init(token: string) {
      return new Promise((resolve) => {
        removeToken();
        setToken(token);
        resolve(true);
      });
    },
    clearToken() {
      return new Promise((resolve) => {
        removeToken();
        this.token = null;
        resolve(true)
      })
    },
    async initInfo(data: any) {
      if (!data.contact) {
        data.contact = {
          '电话': null,
          'QQ': null,
          '微信': null,
          '邮箱': null
        }
      } else if (Object.values(data.contact).length < 4) {
        let keys = ['电话', 'QQ', '微信', '邮箱']
        keys.forEach((item: string) => {
          data.contact[item] = data.contact[item] ?? ''
        })
      }
      this.updateCateGoryScore()
      return new Promise((resolve) => {
        this.realName = data.name;
        this.name = data.nickname;
        this.studentId = data.studentId;
        this.avatar = data.avatar;
        this.hasBind = data.hasBind;
        this.userId = data.userId;
        this.sex = data.sex;
        this.contact = data.contact;
        this.semesterName = data.semesterName;
        this.semesterId = data.id
        this.departmentId = data.departmentId
        this.department = data.department
        this.enrollmentYear = data.enrollmentYear
        this.major = data.major
        this.campus = data.campus
        resolve(true);
      });
    },
    getEvaluationsCnt(data: number) {
      this.EvaluationsCnt = Number(data)
    },
    updateCateGoryScore() {
      getUserCateGoryScore()
        .then(({ data }) => {
          this.cateGoryScore = data
        })
    },
    logOut() {
      logOut()
        .then(() => {
          this.clearToken()
            .then(() => {
              useWsStore().closeWebSocket();
              useRouterCacheStore().clearRouterCache()
              useUserStore().$reset();
              window.localStorage.clear()
            })
            .finally(() => {
              router.replace({ path: '/', query: { isLogOut: 1 } });
            })
        });
    },
  },
  getters: {},
  persist: true, // 持久化
});
