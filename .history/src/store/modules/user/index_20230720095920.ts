import { defineStore } from "pinia"
import { getToken, setToken, removeToken } from "@/utils/auth/auth"

interface userInfo {
    token: string | undefined,
    nickname: string | null,
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
        updateToken(token: string) {
            this.token = setToken(token)
        },
        clearToken() {
            this.token = null
            removeToken()
        },
        initInfo() {

        }
    }
})