import router from "./router/index"
import { getToken } from "./utils/auth/auth"
import NProgress from "nprogress"   // 路由加载时候的进度条

NProgress.configure({ showSpinner: false })

const whiteList = ['/', '/register']

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const hasToken = getToken()
    // 读取到token
    console.log('to: ', to)
    if (hasToken) {
        if (to.path === '/') {
            next({ path: '/mainPage/home' })
        } else {
            next()
        }
    } else {  // 无 token 或者 token 过期
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next({ path: '/' })
        }
    }
    NProgress.done()
})

router.afterEach(() => {
    NProgress.done()
})
