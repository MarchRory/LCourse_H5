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
            console.log('beginLink: ', this.wsInstance)
            if (!this.wsInstance) {
                this.isUserQuit = false
                this.$retryCnt = 0
                this.wsInstance = initMyWebSocket()
            }
        },
        closeWebSocket() {
            console.log('quit: ', this.wsInstance)
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