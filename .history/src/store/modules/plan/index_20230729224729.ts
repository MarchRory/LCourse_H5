import { defineStore } from "pinia"
import rq from '@/api/objectives/objectives'

/* function planObj<T>(arg: Array<T>):Array<T> {
    return arg
} */

interface objectives {
    total: number,
    list: Array<Object>
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