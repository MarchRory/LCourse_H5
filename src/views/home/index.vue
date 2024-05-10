<script setup lang="ts">
import { getCourses } from '@/api/courses/courses';
import { HomeSearchParams } from './components/types';
import { useUserStore } from '@/store/modules/user';
import { selectCourseParams } from '@/api/types/courses';
import { debounce } from '@/utils/freqCtrl/freqCtrl';
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

const waterfall = ref()
const scrollTop = ref(0)

const handleScroll = debounce((curScrollTop: number) => {
    scrollTop.value = curScrollTop
})

onActivated(() => {
    nextTick(() => {
        waterfall.value && waterfall.value.waterFallScrollTo(scrollTop.value)
    })
});
</script>

<template>
    <div class="pageContainer">
        <HomeHeader
            :category="pageParams.category"
            :state="pageParams.state"
            @on-tab-change="handleTabChange"
            @on-search-params-change="handleFilterParamsChange"
        />
        <main>
            <CoursewaterFall
                ref="waterfall"
                :request-api="getCourses"
                :column="2"
                :other-request-params="pageParams"
                @on-scroll="handleScroll"
            />
        </main>
    </div>
</template>

<style scoped lang="less">
</style>