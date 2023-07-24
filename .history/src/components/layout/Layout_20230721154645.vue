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
            <van-tabbar route safe-area-inset-top safe-area-inset-bottom inactive-color="#BEBAB3" active-color="#E3562A">
                <van-tabbar-item replace v-for="(item, index) in tabbar" :key="index" :to="item.path" :icon="item.icon">
                    {{ item.title }}
                </van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<style lang="less" scoped>
:deep(.van-tabbar) {
    border-radius: 16px 16px 0px 0px;
    box-sizing: border-box;
    border: 2px solid #BEBAB3;
    height: calc(var(--van-tabbar-height) + 8px);
}

.main {
    width: 100vw;
    height: calc(100vh - var(--van-tabbar-height) - 8px);
    margin-bottom: var(--van-tabbar-height);
    overflow-y: auto;
}
</style>