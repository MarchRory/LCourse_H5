import { defineStore } from "pinia"
import { getToken, setToken, removeToken } from "@/utils/auth/auth"


interface userInfo {
    token: string | undefined,
    username: string | null,
    stuId: number | null,
    avatar: string | null
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
        init(token: string) {
            return new Promise((resolve, reject) => {
                removeToken()
                setToken(token)
                resolve(true)
            })
        },
        clearToken() {
            this.token = undefined
            removeToken()
        },
        initInfo(data: object) {
            this.nickname = data.
        },
        logOut() {

        }
    },
    getters: {

    },
    persist: true  // 持久化
})