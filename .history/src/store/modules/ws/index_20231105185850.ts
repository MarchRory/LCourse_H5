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
            if (!this.wsInstance) {
                this.isUserQuit = false
                this.$retryCnt = 0
                this.wsInstance = initMyWebSocket()
                console.log('有效的wsIntance: ', this.wsInstance, '类型: ', Object.prototype.toString.call(this.wsInstance))
            } else {
                let protoType = Object.prototype.toString.call(this.wsInstance)
                if (protoType !== '[object WebSocket]') {
                    this.wsInstance = null
                    this.$retryCnt = 0
                    this.initWs()
                }
            }
        },
        closeWebSocket() {
            console.log("下线： ", Object.prototype.toString.call(this.wsInstance))
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