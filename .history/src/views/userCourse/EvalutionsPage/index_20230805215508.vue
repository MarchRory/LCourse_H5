<script setup lang="ts">
import { useUserStore } from '@/store/modules/user/index';
import { reactive } from 'vue'
const themeVars = reactive({
    navBarTextColor: "#e1562a",
    navBarIconColor: "#e1562a",
});
const userStore = useUserStore()
</script>

<template>
    <div class="container">
        <van-config-provider :theme-vars="themeVars">
            <van-nav-bar @click-right="readAll">
                <template #title><span style="color: #e1562a">考评信息</span></template>
                <template #right>
                    <span style="color: #e1562a">全部已读</span>
                </template>
            </van-nav-bar>
            <van-dropdown-menu active-color="#e1562a">
                <van-dropdown-item v-model="state" :options="option" />
            </van-dropdown-menu>
            <course-page-skeleton :skeLoad="listLoading" v-if="listLoading"></course-page-skeleton>
            <div class="container" v-else>
                <van-pull-refresh v-model="reLoad" @refresh="refresh">
                    <div class="list">
                        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                            <van-cell v-for="course in courseList" :key="course.id">
                                <course-preview :course="course"></course-preview>
                            </van-cell>
                        </van-list>
                    </div>
                </van-pull-refresh>
            </div>
        </van-config-provider>

    </div>
</template>

<style lang="less" scoped>
.container {
    width: 100vw;

}
</style>