<script setup lang="ts">
import { ref } from 'vue'
const tabbar = ref([
    {
        path: '/mainPage/home',
        icon: '',
        title: '首页'
    },
    {
        path: '/mainPage/plan',
        icon: '',
        title: '课程规划'
    },
    {
        path: '/mainPage/user',
        icon: '',
        title: '个人中心'
    }
])

</script>

<template>
    <div class="container">
        <div class="layout">
            <router-view />
        </div>

        <div>
            <van-tabbar route>
                <van-tabbar-item replace v-for="(item, index) in tabbar" :key="index" :to="item.path" :icon="item.icon">
                    {{ item.title }}
                </van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<style lang="less" scoped></style>