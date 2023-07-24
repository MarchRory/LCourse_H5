import router from "./router"
import { getToken, setToken, removeToken } from "./utils/auth/auth"
import NProgress from "nprogress"   // 路由加载时候的进度条

NProgress.configure({ showSpinner: false })

const authPath = import.meta.env.VITE_APP_API_BASE_URL + `/user/yiban/login?callback=${import.meta.env.VITE_APP_REDIRECT_PATH}`

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
    NProgress.start()
    const hasToken = getToken()
    // 读取到token
    //debugger
    if (hasToken) {
        if (to.path === '/') {
            next('/login')
            NProgress.done()
        }
    } else {  // 初次登录无 token 或者 token 过期
        window.location.href = authPath
        if (whiteList.indexOf(to.path) != -1) {
            next()
            /*             let path = window.location.href
                        if (path.includes('?')) {
                            const token = window.location.href.split('?')[1].split('=')[1].split('#/')[0]
                            setToken(token)
                            next()
                        } else {
                            window.location.href = authPath
                        } */
            //next(`/?redirect=${to.path}`)
        }
    }
    next()
    NProgress.done()
})

router.afterEach(() => {
    NProgress.done()
})
