import { defineStore } from "pinia"
import rq from '@/api/objectives/objectives'

export const useUserStore = defineStore('userInfo', {
    state: (): userInfo => {
        return {

        }
    },
    actions: {

    },
    getters: {

    },
    persist: true  // 持久化
})