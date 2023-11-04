import { defineStore } from "pinia";
import { initMyWebSocket } from "@/utils/webSocket/index";
interface MyWSType {
    wsInstance: WebSocket | null,
    $retryCnt: number
}
export const useWsStore = defineStore("usePlanStore", {
    state: (): MyWSType => {
        return {
            wsInstance: null,
            $retryCnt: 0
        };
    },
    actions: {
        initWs() {
            if (!this.wsInstance) {
                this.wsInstance = initMyWebSocket()
            }
        },
        closeWebSocket() {
            if (this.wsInstance) {
                this.wsInstance.close();
            }
        }
    },
    getters: {},
    persist: true, // 持久化
});