<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, defineAsyncComponent } from 'vue'
import rqObj from '@/api/objectives/objectives'
const courseslist = defineAsyncComponent(
    () => import('@/components/courseList/courseList.vue')
)
const route = useRoute()
const list = ref([])
onMounted(() => {
    if (typeof route.query.id === 'number') {
        rqObj.getObjDetail(route.query.id)
            .then((res: any) => {
                const { courseList, courseObjectives } = res.data
                list.value = courseList
            })
    }
})


</script>

<template>
    <div class="container">
        <van-sticky :offset-top="0">
            <header>
                <div class="temp" style="width: 12vw;"></div>
                <div class="title">
                    课<span style="color: #939392; font-weight: 200;">程</span>规<span
                        style="color: #939392; font-weight: 200;">划</span>
                </div>
                <div class="tools">
                    <van-icon name="apps-o" size="32" />
                </div>
            </header>
        </van-sticky>
    </div>
</template>

<style scoped lang="less">
.container {
    width: 100%;
}
</style>