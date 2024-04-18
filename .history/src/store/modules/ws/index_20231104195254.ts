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
                this.wsInstance = initMyWebSocket()
            }
        },
        closeWebSocket() {
            console.log(this.wsInstance)
            if (this.wsInstance) {
                this.wsInstance.close(1000);
            }
        }
    },
    getters: {},
    persist: true, // 持久化
});