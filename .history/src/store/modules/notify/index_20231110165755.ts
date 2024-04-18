import { defineStore } from "pinia";

/* function planObj<T>(arg: Array<T>):Array<T> {
    return arg
} */
interface windowNotifyBar {
    isNotifyShow: boolean
    notifyText: string
    notifyScrollCnt: number
    notifyScrollLimit: number
}

export const useNotifyStore = defineStore("useNotifyStore", {
    state: (): windowNotifyBar => {
        return {
            isNotifyShow: true,
            notifyText: 'Hello TypeScript!',
            notifyScrollCnt: 0,
            notifyScrollLimit: 3
        };
    },
    actions: {
        notify(notifyText: string) {
            this.notifyText = notifyText
            this.isNotifyShow = true
        },
        close() {
            this.notifyText = null
            this.isNotifyShow = false
            this.notifyScrollCnt = 0
        }
    },
});