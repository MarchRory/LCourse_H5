import router from "./router"
import { getToken } from "./utils/auth/auth"
import NProgress from "nprogress"   // 路由加载时候的进度条

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/register']

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const hasToken = getToken()
    // 读取到token
    if (hasToken) {
        console.log('to: ', to)
        if (to.path === '/login') {
            next({ path: '/mainPage' })
        } else {
            next()
        }
    } else {  // 初次登录无 token 或者 token 过期
        if (whiteList.indexOf(to.path) !== -1) {
            next(to.path)
        } else {
            next('/login')
        }
    }
    NProgress.done()
})

router.afterEach(() => {
    NProgress.done()
})
