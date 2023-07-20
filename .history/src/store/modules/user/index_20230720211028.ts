import { defineStore } from "pinia"
import { getToken, setToken, removeToken } from "@/utils/auth/auth"
import router from '@/router'

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
            username: null,
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
        initInfo(data: any) {
            return new Promise((resolve, reject) => {
                const { userInfo } = data
                this.username = userInfo.username
                this.avatar = userInfo.avatar
                resolve(true)
            })
        },
        logOut() {
            this.clearToken()
            router.push({ path: '/' })
        }
    },
    getters: {

    },
    persist: true  // 持久化
})