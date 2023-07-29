import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/components/layout/Layout.vue'
export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'welcome',
        meta: {
            title: 'welcome'
        },
        component: () => import('@/views/welcome/index.vue')
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
        },
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/mainPage',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页'
                }
            },
            {
                path: '/plan',
                meta: {
                    title: '课程规划'
                },
                component: () => import('@/views/plan/index.vue'),
                redirect: '/plan/myCoursesPlan',
                children: [
                    {
                        path: 'myCoursesPlan',
                        name: 'myCoursesPlan',
                        meta: {
                            title: '课程规划'
                        },
                        component: () => import('@/views/plan/myCoursesPlan/index.vue')
                    },
                ]
            },
            {
                path: '/user',
                name: 'user',
                meta: {
                    title: "个人中心"
                },
                component: () => import('@/views/user/index.vue')
            },
        ]
    },
    {
        path: 'coursesPlanDetail',
        name: 'coursesPlanDetail',
        meta: {
            title: '课程规划详情'
        },
        component: () => import('@/views/plan/coursesPlanDetail/inde.vue')
    },
    {
        path: '/searchRes',
        name: 'searchRes',
        meta: {
            title: '搜索结果'
        },
        component: () => import('@/views/searchRes/index.vue')
    },
    {
        path: '/detail',
        name: 'detail',
        meta: {
            title: '课程详情'
        },
        component: () => import('@/views/courseDetail/index.vue')
    },
    {
        path: '/command',
        name: 'command',
        meta: {
            title: '课程评价'
        },
        component: () => import('@/views/command/index.vue')
    },
    {
        path: '/commandRes',
        name: 'commandRes',
        meta: {
            title: '评价反馈'
        },
        component: () => import('@/views/commandRes/index.vue')
    },
    // 替代vue2中的'*'通配符路径
    { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
    history: createWebHashHistory(), // history 模式则使用 createWebHistory()
    routes,
});
export default router;