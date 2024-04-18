import { defineStore } from "pinia";

/* function planObj<T>(arg: Array<T>):Array<T> {
    return arg
} */
interface windowNotifyBar {
    isNotifyShow: boolean
    text: string
    cnt: number
}

export const useNotifyStore = defineStore("useNotifyStore", {
    state: (): windowNotifyBar => {
        return {
            isShow: true,
            text: 'Hello TypeScript!',
            cnt: 0,
        };
    },
    actions: {
        notify(notifyText: string) {
            this.text = notifyText
            this.isNotifyShow = true
            setTimeout(() => {
                this.isNotifyShow = false
            }, 10 * 1000)
        },
        close() {

        }
    },
});