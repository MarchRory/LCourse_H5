<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, defineAsyncComponent } from 'vue'
import rqObj from '@/api/objectives/objectives'
import defaultCover from '@/assets/imgs/Cool-Kids-Discussion.png'
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

            </header>
        </van-sticky>
    </div>
    <ul class="results-list">
        <li @click="toDetailsBnt(v.id, v.isSignUp)" class="list-item" v-for="(v, i) in resultsArr" :key="i">
            <div class="item-top">
                <img class="item-img" :src="v.cover || defaultCover" alt="课程首页" />
                <div class="item-top-label">{{ v.pointsRules }}</div>
            </div>
            <div class="item-bottom">
                <p class="time">
                    <span>{{ v.hostingStart }}</span>到<span>{{ v.hostingEnd }}</span>
                </p>
                <h3>{{ v.title }}</h3>
                <p class="text">{{ v.courseCategory }}</p>
            </div>
        </li>
    </ul>
</template>

<style scoped lang="less">
.container {
    width: 100%;

    header {}
}
</style>