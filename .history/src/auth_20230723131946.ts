import router from "./router"
import { getToken, setToken } from "./utils/auth/auth"
import NProgress from "nprogress"   // 路由加载时候的进度条

NProgress.configure({ showSpinner: false })

const authPath = import.meta.env.VITE_APP_API_BASE_URL + `/user/yiban/login?callback=${import.meta.env.VITE_APP_REDIRECT_PATH}`

const whiteList = [authPath, '/', '/login']

router.beforeEach((to, from, next) => {
    NProgress.start()
    const hasToken = getToken()
    // 读取到token
    debugger
    if (hasToken) {
        if (from.path != '/' && from.path != '/login' && (to.path === '/' || to.path === '/login'))
            next({ path: from.path })
        next()
    } else {  // 初次登录无 token 或者 token 过期
        if (whiteList.indexOf(to.path) != -1) {
            router.push({ path: `/?redirect=${to.path}` })
        }
    }
    NProgress.done()
})

router.afterEach(() => {
    NProgress.done()
})
