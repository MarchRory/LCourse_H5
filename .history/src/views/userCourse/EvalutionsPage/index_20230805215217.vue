<script setup lang="ts">
import { useUserStore } from '@/store/modules/user/index';

const userStore = useUserStore()
</script>

<template>
    <div class="container">
        <van-config-provider :theme-vars="themeVars">
            <van-nav-bar @click-right="openEvaluations">
                <template #title><span style="color: #e1562a">我的课程</span></template>
                <template #right>
                    <van-icon v-if="!userStore.EvaluationsCnt" name="chat-o" size="28" />
                    <van-icon v-else name="chat-o" size="28" :badge="userStore.EvaluationsCnt" />
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

<style lang="less" scoped></style>