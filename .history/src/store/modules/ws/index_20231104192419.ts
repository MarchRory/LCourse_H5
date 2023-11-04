import { defineStore } from "pinia";
import { showFailToast } from "vant";

export const useWsStore = defineStore("usePlanStore", {
    state: () => {
        return {
            wsInstance: null
        };
    },
    actions: {

    },
    getters: {},
    persist: true, // 持久化
});