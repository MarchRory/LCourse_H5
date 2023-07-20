import { defineStore } from "pinia"
import { getToken, setToken, removeToken } from "@/utils/auth/auth"

export const useUserStore = defineStore('userInfo', {
    state: () => ({
        token: getToken(),
        nickname: '',
        stuId: '',  //学号
        avatar: '',
    }),
    actions: {
        updateToken(token: string) {
            this.token = setToken(token)
        },
        clearToken() {
            this.token = ''
            removeToken()
        },
        initInfo() {

        }
    }
})