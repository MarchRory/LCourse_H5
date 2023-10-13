import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { defineAsyncComponent } from "vue";
const Layout = defineAsyncComponent(
  () => import('@/components/layout/Layout.vue')
)
import aliveIndex from '@/views/searchRes/aliveIndex.vue'
// import scan from "@/views/scanQR/index.vue";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    meta: {
      title: '登录',
      index: 1
    },
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/wait",
    name: "wait",
    meta: {
      title: '请稍后',
      index: 1
    },
    component: () => import("@/views/welcome/index.vue"),
  },
  {
    path: '/mainPage:',
    name: 'layOut',
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: '首页',
          index: 1
        },
      },
      {
        path: '/plan',
        name: 'plan',
        meta: {
          title: '课程规划',
          index: 1
        },
        component: () => import("@/views/plan/index.vue"),
      },
      {
        path: "/userCourse",
        name: "userCourse",
        meta: {
          title: '我的课程',
          index: 1
        },
        component: () => import("@/views/userCourse/userCourse.vue"),
      },
      {
        path: "/user",
        name: "user",
        meta: {
          title: '个人中心',
          index: 1
        },
        component: () => import("@/views/user/index.vue"),
      },
      {
        path: "/userInfo",
        name: "UserInfo",
        meta: {
          title: '个人信息',
          index: 2
        },
        component: () => import("@/views/user/baseInfo.vue"),
      },
      {
        path: "/password",
        name: "Password",
        meta: {
          title: '密码更新',
          index: 2
        },
        component: () => import("@/views/user/passwordInfo.vue"),
      },
      {
        path: "/userObjectives",
        name: "UserObjectives",
        meta: {
          title: '历史规划',
          index: 2
        },
        component: () => import("@/views/user/course/userObjectives.vue"),
      },
    ],
  },
  {
    path: '/evalutions',
    name: 'evalutions',
    meta: {
      title: '考评消息',
      index: 2
    },
    component: () => import('@/views/userCourse/EvalutionsPage/index.vue')
  },
  {
    path: '/coursesPlanDetail',
    name: 'coursesPlanDetail',
    meta: {
      title: "课程规划详情",
      index: 2
    },
    component: () => import("@/views/plan/coursesPlanDetail/inde.vue"),
  },
  {
    path: '/searchRes',
    redirect: '/index',
    component: aliveIndex,
    children: [
      {
        path: 'index',
        name: 'searchRes',
        meta: {
          title: '课程搜索',
          index: 2
        },
        component: () => import('@/views/searchRes/index.vue')
      }
    ]
  },
  {
    path: "/detail",
    name: "detail",
    meta: {
      title: '课程详情',
      index: 3
    },
    component: () => import("@/views/courseDetail/index.vue"),
  },
  {
    path: "/command",
    name: "command",
    meta: {
      title: '课程评价',
      index: 2
    },
    component: () => import("@/views/command/index.vue"),
  },
  /*   {
      path: "/scan",
      component: scan,
      redirect: "/scanQR",
      children: [
        {
          path: "scanQR",
          name: "scanQR",
          component: () => import("@/views/scanQR/scan/index.vue"),
          meta: {
            title: "扫码签到",
          },
        },
      ],
    }, */
  // 替代vue2中的'*'通配符路径
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHashHistory(), // history 模式则使用 createWebHistory()
  routes,
});
export default router;
