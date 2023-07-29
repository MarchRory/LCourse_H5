import { defineStore } from "pinia"
import rq from '@/api/objectives/objectives'

interface objectives {

}


export const useUserStore = defineStore('userInfo', {
    state: (): objectives => {
        return {

        }
    },
    actions: {

    },
    getters: {

    },
    persist: true  // 持久化
})