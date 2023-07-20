<script setup lang="ts">
import { routes } from '../../router/index'


</script>

<template>
    <div class="container">
        <div class="layout">
            <router-view />
        </div>

        <div>
            <van-tabbar route>
                <van-tabbar-item replace to="/home" icon="home-o">标签</van-tabbar-item>
                <van-tabbar-item replace to="/search" icon="search">标签</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<style lang="less" scoped></style>