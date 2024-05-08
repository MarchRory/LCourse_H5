<script setup lang="ts">
import { getCourses } from '@/api/courses/courses';
import { HomeSearchParams } from './components/types';
import { useUserStore } from '@/store/modules/user';
import { selectCourseParams } from '@/api/types/courses';
const HomeHeader = defineAsyncComponent(() => import('./components/home-header.vue'))
const CoursewaterFall = defineAsyncComponent(() => import('@/components/waterFall/index.vue'))

defineOptions({
    name: 'home'
})
const userStore = useUserStore()

const pageParams = ref<Pick<selectCourseParams, keyof Omit<selectCourseParams, 'title' | "pageNum" | "pageSize">>>({
    category: "",
    state: 0,
    departmentLimit: [],
    gradeLimit: [],
    userType: 0,
    reviewed: 0,
    passType: -1,
    semesterId: ""
})
const handleTabChange = (newTab: number) => {
    pageParams.value.departmentLimit = newTab ? [userStore.departmentId] : []
}
const handleFilterParamsChange = (newFilterParams: HomeSearchParams) => {
    const {category, state} = newFilterParams
    pageParams.value.category = category
    pageParams.value.state = +state
}
</script>

<template>
    <div class="home-container">
        <HomeHeader
            :category="pageParams.category"
            :state="pageParams.state"
            @on-tab-change="handleTabChange"
            @on-search-params-change="handleFilterParamsChange"
        />
        <main>
            <CoursewaterFall
                :request-api="getCourses"
                :column="2"
                :other-request-params="pageParams"
            />
        </main>
    </div>
</template>

<style scoped lang="less">
.home-container {
    padding: 0 20px;
    width: calc(100% - 40px);
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    background-color: @xd-bg;
    &>main {
        width: 100%;
        overflow-y: auto;
        flex: 1;
    }
}
</style>