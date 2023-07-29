import { defineStore } from "pinia"
import rq from '@/api/objectives/objectives'
import { showFailToast } from "vant"

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
            total: 0,
            list: []
        }
    },
    actions: {
        getObjectives() {
            rq.getUserObjects()
                .then((res: any) => {
                    if (res.code == 200) {

                    } else {
                        showFailToast('服务器异常')
                    }
                })
        }
    },
    getters: {

    },
    persist: true  // 持久化
})