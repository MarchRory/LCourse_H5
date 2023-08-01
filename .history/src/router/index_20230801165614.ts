import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/components/layout/Layout.vue";
import aliveIndex from '@/views/searchRes/aliveIndex.vue'
import scan from "@/views/scanQR/index.vue";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "welcome",
    meta: {
      title: "welcome",
    },
    component: () => import("@/views/welcome/index.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
    },
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/mainPage",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "/plan",
        meta: {
          title: "课程规划",
        },
        component: () => import("@/views/plan/index.vue"),
        redirect: "/plan/myCoursesPlan",
        children: [
          {
            path: "myCoursesPlan",
            name: "myCoursesPlan",
            meta: {
              title: "课程规划",
            },
            component: () => import("@/views/plan/myCoursesPlan/index.vue"),
          },
        ],
      },
      {
        path: "/user",
        name: "user",
        meta: {
          title: "个人中心",
        },
        component: () => import("@/views/user/index.vue"),
      },
      {
        path: "/userInfo",
        name: "UserInfo",
        meta: {
          title: "个人信息",
        },
        component: () => import("@/views/user/baseInfo.vue"),
      },
      {
        path: "/password",
        name: "Password",
        meta: {
          title: "密码更新",
        },
        component: () => import("@/views/user/passwordInfo.vue"),
      },
      {
        path: "/userCourse",
        name: "UserCourse",
        meta: {
          title: "用户课程",
        },
        component: () => import("@/views/user/course/userCourse.vue"),
      },
      {
        path: "/userObjectives",
        name: "UserObjectives",
        meta: {
          title: "用户规划",
        },
        component: () => import("@/views/user/course/userObjectives.vue"),
      },
    ],
  },
  {
    path: "/coursesPlanDetail",
    meta: {
      title: "课程规划详情",
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
        name: 'coursesPlanDetail',
        component: () => import('@/views/commandRes/index.vue')
      }
    ]
  },
  {
    path: "/detail",
    name: "detail",
    meta: {
      title: "课程详情",
    },
    component: () => import("@/views/courseDetail/index.vue"),
  },
  {
    path: "/command",
    name: "command",
    meta: {
      title: "课程评价",
    },
    component: () => import("@/views/command/index.vue"),
  },
  {
    path: "/commandRes",
    name: "commandRes",
    meta: {
      title: "评价反馈",
    },
    component: () => import("@/views/commandRes/index.vue"),
  },
  {
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
  },
  // 替代vue2中的'*'通配符路径
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHashHistory(), // history 模式则使用 createWebHistory()
  routes,
});
export default router;
