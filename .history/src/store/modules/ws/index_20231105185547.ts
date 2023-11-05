import { defineStore } from "pinia";
import { mySocket } from "@/utils/webSocket/useSocket";
import { initMyWebSocket } from "@/utils/webSocket/index";
interface MyWSType {
    wsInstance: mySocket | null,
    $retryCnt: number
    isUserQuit: boolean
}
export const useWsStore = defineStore("usePlanStore", {
    state: (): MyWSType => {
        return {
            wsInstance: null,
            $retryCnt: 0,
            isUserQuit: false
        };
    },
    actions: {
        initWs() {
            console.log('wsInstance: ', this.wsInstance, '原型链: ', Object.prototype.toString.call(this.wsInstance))
            if (!this.wsInstance) {
                this.isUserQuit = false
                this.$retryCnt = 0
                this.wsInstance = initMyWebSocket()
                console.log('有效的wsIntance: ', this.wsInstance, '类型: ', typeof this.wsInstance)
            }
        },
        closeWebSocket() {
            console.log("下线： ", this.wsInstance)
            if (this.wsInstance) {
                this.isUserQuit = true
                this.wsInstance.closeLink();
                this.wsInstance = null
            }

        }
    },
    getters: {},
    persist: true, // 持久化
});