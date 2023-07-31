<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, defineAsyncComponent, watch } from 'vue'
import rqObj from '@/api/objectives/objectives'
import { showFailToast } from 'vant';
const route = useRoute()
const list = ref([] as any)
const skeletonLoad = ref(true)
const objInfo = ref({} as any)
const backBtn = defineAsyncComponent(
    () => import('@/components/backButton/backButton.vue')
)
const courseSke = defineAsyncComponent(
    () => import('@/components/coursePageSkeleton/coursePageSkeleton.vue')
)
const course = defineAsyncComponent(
    () => import('@/components/coursePreview/coursePreview.vue')
)
const header = ref<HTMLDivElement | null>(null)
const headerHeight = ref(0)
onMounted(() => {
    let objId = Number(route.query.id)
    Promise.all([rqObj.getObjDetail(objId), rqObj.getObjCourses(objId)])
        .then((res: any) => {
            if (res[0].code == 200 && res[1].code == 200) {
                objInfo.value = res[0].data
                list.value = res[1].data.list
            } else {
                showFailToast('网络异常, 课程信息获取失败')
            }
        })
        .finally(() => {
            setTimeout(() => {
                skeletonLoad.value = false
            }, 400)
        })
    rqObj.getObjDetail(objId)
        .then((res: any) => {
            const { data } = res
            objInfo.value = data
        })
})

watch(
    () => skeletonLoad.value,
    (newV) => {
        if (!newV) {
            nextTick(() => {
                headerHeight.value = (header.value as HTMLDivElement).offsetHeight
            })
        }
    }
)
</script>

<template>
    <course-ske :ske-load="skeletonLoad"></course-ske>

    <div class="container" v-if="!skeletonLoad">
        <header ref="header">
            <back-btn />
            <div class="title">{{ objInfo.objectivesName }}</div>
            <div class="seat"></div>
        </header>


        <div v-if="list && list.length" :style="{ height: `calc(100vh - var(--van-tabbar-height) - ${headerHeight}px)` }">
            <van-cell v-for="( course, index ) in  list " :key="index">
                <course :course="course"></course>
            </van-cell>

            <van-cell v-for="( course, index ) in  list " :key="index">
                <course :course="course"></course>
            </van-cell>
        </div>

        <van-empty v-else description="老师还没有给这个目标分配课程哦" />
    </div>
</template>

<style scoped lang="less">
.container {
    width: 100%;
    overflow-x: hidden;

    header {
        height: 140px;
        width: calc(100vw - 40px);
        display: flex;
        padding-left: 25px;
        padding-right: 25px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .title {
            width: calc((100vw - 40px)/2);
            font-family: Gen Jyuu Gothic;
            font-size: 42px;
            font-weight: 500;
            line-height: 32px;
            text-align: center;
            letter-spacing: 5px;
        }

        .seat {
            height: 100%;
            width: 100px;
        }
    }
}
</style>