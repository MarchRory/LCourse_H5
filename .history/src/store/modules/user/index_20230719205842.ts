import { defineStore } from "pinia"
export const useUserStore = defineStore('userInfo', {
    state: () => ({
        token: null,
        nickname: '',
        stuId: '',  //学号
    })
})