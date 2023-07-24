<script setup lang="ts">
import { ref } from 'vue'
const tabbar = ref([
    {
        path: '/home',
        icon: 'column',
        title: '首页'
    },
    {
        path: '/plan',
        icon: 'cluster',
        title: '课程规划'
    },
    {
        path: '/user',
        icon: 'setting',
        title: '个人中心'
    }
])

</script>

<template>
    <div class="container">
        <div class="main">
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

<style lang="less" scoped>
.main {
    width: 100%;
    height: calc(100vh - var(--van-tabbar-height));
    background-color: aqua;
}
</style>