import { defineStore } from "pinia";
interface routerCacheType {
    cache: string[]
}
export const useWsStore = defineStore("useRouterCacheStore", {
    state: (): routerCacheType => {
        return {
            cache: []
        };
    },
    actions: {
        initRouterCache() {
            this.cache = ['home', 'user', 'plan', 'userCourse']
        },
        clearRouterCache() {
            this.cache = []
        }
    },
    getters: {},
    persist: true, // 持久化
});