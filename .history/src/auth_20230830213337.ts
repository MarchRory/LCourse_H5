import router from "./router"
import { getToken, setToken } from "./utils/auth/auth"
import NProgress from "nprogress"   // 路由加载时候的进度条
import getPageTitle from "./utils/pageTitle"
import { showNotify } from "vant"

NProgress.configure({ showSpinner: false })

const whiteList = ['/wait', '/']

router.beforeEach((to: any, from, next: Function) => {
    NProgress.start()
    document.title = getPageTitle(to.meta.title)
    const hasToken = getToken()
    // 读取到token
    if (hasToken) {
        /*         if (window.location.href.includes('errorMessage')) {
                    let message = window.location.href.split('errorMessage=')[1].split('#/')[0]
                    setTimeout(() => {
                        showNotify({ type: 'danger', message: message })
                    }, 400)
                    let url = window.location.href.split('?')[0]
                    window.location.href = url 
                    debugger
                    next()
                    NProgress.done()
                } */

        if (to.path === '/') {
            console.log(window.location.href)
            let url = window.location.href.split('/#/')[0].split('/')
            console.log(url)
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
        if (whiteList.indexOf(to.path) != -1 && !to.query.isLogOut) {
            let path = window.location.href
            if (path.includes('?')) {
                const token = window.location.href.split('?')[1].split('=')[1].split('#/')[0]
                setToken(token)
                next('/wait')
                NProgress.done()
            } else {
                next()
            }
        } else {
            // to.query 里有isLogOut, 但是tokne依然在url里, 这时候必须要对url处理去token
            let url = window.location.href
            url = url.split('wait')[0] + '#/'
            window.location.href = url
            //next()
            NProgress.done()
        }
    }
    NProgress.done()
})

router.afterEach(() => {
    NProgress.done()
})
