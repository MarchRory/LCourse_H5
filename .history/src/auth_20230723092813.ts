import router from "./router"
import { getToken } from "./utils/auth/auth"
import NProgress from "nprogress"   // 路由加载时候的进度条

NProgress.configure({ showSpinner: false })

const whiteList = ['/', '/login']

router.beforeEach((to, from, next) => {
    NProgress.start()
    const hasToken = getToken()
    console.log(hasToken)
    // 读取到token
    if (hasToken && hasToken != 'undefined') {
        if (from.path != '/' && from.path != '/login' && (to.path === '/' || to.path === '/login'))
            next({ path: from.path })
        next()
    } else {  // 初次登录无 token 或者 token 过期
        if (whiteList.indexOf(to.path) !== -1) {
            next({ path: '/' })
        } else {
            next(`/`)
        }
    }
    NProgress.done()
})

router.afterEach(() => {
    NProgress.done()
})
