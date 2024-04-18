import { defineStore } from "pinia";

/* function planObj<T>(arg: Array<T>):Array<T> {
    return arg
} */

interface windowNotify {
    isShow: boolean
    text: string
}

const useNotifyStore = defineStore("useNotifyStore", {
    state: (): windowNotify => {
        return {
            isShow: false,
            text: ''
        };
    },
    actions: {
        notify(notifyText: string) {
            this.text = notifyText
            this.isShow = true
            setTimeout(() => {
                this.isShow = false
            }, 8 * 1000)
        }
    },
    getters: {},
});

const notifyStore = useNotifyStore()
export default notifyStore