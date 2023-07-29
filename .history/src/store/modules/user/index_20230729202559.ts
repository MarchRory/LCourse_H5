import { defineStore } from "pinia"
import { getToken, setToken, removeToken } from "@/utils/auth/auth"
import rq from '@/api/user/user'
import router from '@/router'

interface userInfo {
    token: string | undefined,
    name: string | null,
    sex: number | null,
    studentId: string | null, // 学号
    yiBanId: string | null,
    uid: number | null,        // 报名时候用的这个id
    avatar: string | null,
    enrollmentYear: string | null,   // 入学年份
    contact: object | null,
    semesterId: number | null

}

export const useUserStore = defineStore('userInfo', {
    state: (): userInfo => {
        return {
            token: getToken(),
            name: null,
            studentId: null,  //学号
            avatar: null,
            yiBanId: null,
            uid: null,
            enrollmentYear: null,
            sex: null,
            contact: null,
            semesterId: null
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
            return new Promise((resolve, reject) => {
                this.name = data.name
                this.studentId = data.studentId
                this.avatar = data.avatar
                this.yiBanId = data.yiBanId
                this.uid = data.uid
                this.enrollmentYear = data.enrollmentYear
                this.sex = data.sex
                this.contact = data.contact
                resolve(true)
            })
        },
        clearState() {
            return {
                token: undefined,
                name: null,
                studentId: null,  //学号
                avatar: null,
                yiBanId: null,
                uid: null,
                enrollmentYear: null,
                sex: null,
                contact: null,
                semesterId: null
            }
        },
        logOut() {
            rq.logOut()
                .then(() => {
                    this.clearToken()
                    this.clearState()
                    useUserStore().$reset()
                    router.push({ path: '/login?redirect=/' })
                })
        },
        setSemesterId(id: number) {
            this.semesterId = id
        }
    },
    getters: {

    },
    persist: true  // 持久化
})