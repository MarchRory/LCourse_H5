import { defineStore } from "pinia"
import { getToken, setToken, removeToken } from "@/utils/auth/auth"
import rq from '@/api/user/user'
import router from '@/router'

interface userInfo {
    token: string | undefined,
    name: string | null,
    sex: string | null,
    studentId: number | null, // 学号
    yibanId: number | null,
    uId: number | null,        // 报名时候用的这个id
    avatar: string | null,
    enrollmentYear: string | null,   // 入学年份
    contact: object | null

}

export const useUserStore = defineStore('userInfo', {
    state: (): userInfo => {
        return {
            token: getToken(),
            name: null,
            studentId: null,  //学号
            avatar: null,
            yibanId: null,
            uId: null,
            enrollmentYear: null,
            sex: null,
            contact: null
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
            removeToken()
            this.token = undefined
        },
        initInfo(data: any) {
            console.log('res:', data)
            return new Promise((resolve, reject) => {
                this.name = data.name
                this.studentId = data.studentId
                this.avatar = data.avatar
                this.yibanId = data.yibanId
                this.uId = data.uId
                this.enrollmentYear = data.enrollmentYear
                this.sex = data.sex
                this.contact = data.contact
                resolve(true)
            })
        },
        clearState() {

        },
        logOut() {
            rq.logOut()
                .then(() => {
                    this.clearToken()
                    this.clearState()
                    useUserStore().$reset()
                    router.push({ path: '/login?redirect=/' })
                })
        }
    },
    getters: {

    },
    persist: true  // 持久化
})