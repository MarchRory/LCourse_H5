import router from "./router"
import { getToken, setToken } from "./utils/auth/auth"
import NProgress from "nprogress"   // 路由加载时候的进度条
import getPageTitle from "./utils/pageTitle"

NProgress.configure({ showSpinner: false })

const whiteList = ['/wait', '/']

router.beforeEach((to: any, from, next: Function) => {
    NProgress.start()
    document.title = getPageTitle(to.meta.title)
    const hasToken = getToken()
    // 读取到token
    if (hasToken) {
        if (to.path === '/') {
            next('/wait')
            NProgress.done()
        } else {
            next()
            NProgress.done()
        }
    } else {  // 初次登录无 token 或者 token 过期
        console.log(to)
        if (whiteList.indexOf(to.path) != -1) {
            let path = window.location.href
            if (path.includes('?')) {
                const token = window.location.href.split('?')[1].split('=')[1].split('#/')[0]
                setToken(token)
                NProgress.done()
            }
            //next(`/?redirect=${to.path}`)
        }
        next()
    }
    NProgress.done()
})

router.afterEach(() => {
    NProgress.done()
})
