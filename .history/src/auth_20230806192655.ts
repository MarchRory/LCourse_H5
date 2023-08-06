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
            let url = window.location.href.split('/#/')[0].split('/')
            if (url[url.length - 1] === 'user') {
                next({ path: '/user', query: { isBind: true } })
            } else {
                next('/wait')
            }
            NProgress.done()
        } else {
            next()
            NProgress.done()
        }
    } else {  // 初次登录无 token 或者 退出登录
        console.log(from)
        console.log('to: ', to)
        if (whiteList.indexOf(to.path) != -1 && !to.query) {
            let path = window.location.href
            if (path.includes('?')) {
                const token = window.location.href.split('?')[1].split('=')[1].split('#/')[0]
                setToken(token)
                next('/wait')
                NProgress.done()
            } else {
                next()
            }
            //next(`/?redirect=${to.path}`)
        } else {
            next()
            NProgress.done()
        }
    }
    NProgress.done()
})

router.afterEach(() => {
    NProgress.done()
})
