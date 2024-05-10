import { defineStore } from "pinia";
interface routerCacheType {
    cache: string[]
}
export const useRouterCacheStore = defineStore("useRouterCacheStore", {
    state: (): routerCacheType => {
        return {
            cache: []
        };
    },
    actions: {
        initRouterCache() {
            this.cache = ['home', 'user', 'plan', 'evalutions']
        },
        clearRouterCache() {
            this.cache = []
        }
    },
    persist: true, // 持久化
});