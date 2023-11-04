import { defineStore } from "pinia";
import { showFailToast } from "vant";
import { initMyWebSocket } from "@/utils/webSocket/index";
export const useWsStore = defineStore("usePlanStore", {
    state: () => {
        return {
            wsInstance: null
        };
    },
    actions: {
        initWs() {
            this.wsInstance = initMyWebSocket()
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