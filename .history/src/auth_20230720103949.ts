import router from "./router"
import { getToken } from "./utils/auth/auth"
import NProgress from "nprogress"   // 路由加载时候的进度条

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/register']

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const hasToken = getToken()
    console.log('routeParam: ', { to, from })
    // 读取到token
    if (hasToken) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {

        }
    } else {  // 初次登录无 token 或者 token 过期
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
