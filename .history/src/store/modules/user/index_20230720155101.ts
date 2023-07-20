import { defineStore } from "pinia"
import { getToken, setToken, removeToken } from "@/utils/auth/auth"
import rq from '@/api/user/user'


interface userInfo {
    token: string | undefined,
    nickname: string | null,
    stuId: number | null,
    avatar: string | null
}
interface loginForm {
    username: string,
    password: string
}

export const useUserStore = defineStore('userInfo', {
    state: (): userInfo => {
        return {
            token: getToken(),
            nickname: null,
            stuId: null,  //学号
            avatar: null,
        }
    },
    actions: {
        login(loginForm: loginForm) {
            return new Promise((resolve, reject) => {
                rq.login(loginForm).then((res) => {
                    if (res.code == 200) {

                    }
                })
            })
        },
        clearToken() {
            this.token = undefined
            removeToken()
        },
        initInfo() {

        }
    },
    getters: {

    },
    persist: true  // 持久化
})