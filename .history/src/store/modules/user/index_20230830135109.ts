import { defineStore } from "pinia";
import { getToken, setToken, removeToken } from "@/utils/auth/auth";
import rq from "@/api/user/user";
import router from "@/router";

interface badge {
  EvaluationsCnt: number
}

interface userInfo extends badge {
  token: string | null;
  realName: String | null;  // 真名
  name: string | null;      // 网名
  sex: number | null;
  studentId: string | null; // 学号
  hasBind: boolean,         // 是否绑定易班
  uid: number | null; // 报名时候用的这个id
  avatar: string | null;
  enrollmentYear: string | null; // 入学年份
  contact: object | null;       // 联系方式
  semesterId: number | null;     // 当前学期的ID
  semesterName: string | null;    // 当前学期名
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
      uid: null,
      enrollmentYear: null,
      sex: null,
      contact: null,
      semesterId: null,
      EvaluationsCnt: 0,
      semesterName: null,
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
    initInfo(data: any) {
      return new Promise((resolve) => {
        this.realName = data.name;
        this.name = data.nickname;
        this.studentId = data.studentId;
        this.avatar = data.avatar;
        this.hasBind = data.hasBind;
        this.uid = data.userId;
        this.sex = data.sex;
        this.contact = data.contact;
        this.semesterName = data.semesterName;
        this.semesterId = data.id
        resolve();
      });
    },
    getEvaluationsCnt(data: number) {
      this.EvaluationsCnt = data
    },
    clearState() { },
    logOut() {
      rq.logOut().then(() => {
        this.clearState();
        this.clearToken()
          .then(() => {
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
