import { defineStore } from "pinia";
import { initMyWebSocket } from "@/utils/webSocket/index";
interface MyWSType {
    wsInstance: WebSocket | null,
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
            }
        },
        closeWebSocket() {
            if (this.wsInstance) {
                this.isUserQuit = true
                this.wsInstance.close(1000);
                this.wsInstance = null
            }
        }
    },
    getters: {},
    persist: true, // 持久化
});