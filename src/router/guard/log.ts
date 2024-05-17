import xdPerformance from '@/utils/logger/performance'
import { registerPVLog, registerUvLog } from '@/utils/logger/hooks'
import { type Router } from 'vue-router'

function createPageLogRouterGuide(router: Router) {

    router.afterEach((to, __) => {
        const { fullPath, meta } = to
        registerPVLog({
            fullPath,
            pageName: meta.title
        })
        registerUvLog({
            fullPath,
            pageName: meta.title
        })
    })
}

export default createPageLogRouterGuide