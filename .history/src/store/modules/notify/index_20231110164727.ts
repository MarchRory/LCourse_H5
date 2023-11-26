import { defineStore } from "pinia";

/* function planObj<T>(arg: Array<T>):Array<T> {
    return arg
} */
interface windowNotifyBar {
    isShow: boolean
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
            this.isShow = true
            setTimeout(() => {
                this.isShow = false
            }, 10 * 1000)
        },
        close() {

        }
    },
});