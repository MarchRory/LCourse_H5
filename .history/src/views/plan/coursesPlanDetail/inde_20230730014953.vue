<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue'
import rqObj from '@/api/objectives/objectives'
import defaultCover from '@/assets/imgs/Cool-Kids-Discussion.png'
const route = useRoute()
const router = useRouter()
const list = ref([] as any)
onMounted(() => {
    console.log(route.query.id)
    if (typeof route.query.id === 'string') {
        rqObj.getObjDetail(Number(route.query.id))
            .then((res: any) => {
                const { courseList, courseObjectives } = res.data
                list.value = courseList
            })
    }
})

const toDetailsBnt = (courseId: number, isSignUp?: number) => {
    if (typeof courseId == 'number') {
        router.push({
            path: "/detail",
            query: { courseId, isSignUp },
        });
    }
};


</script>

<template>
    <div class="container">
        <van-sticky :offset-top="0">
            <header>

            </header>
        </van-sticky>

        <van-cell v-for="( course, index ) in  list " :key="index" @click="toDetailsBnt(course.id)">
            <div class="course">
                <div>
                    <van-image width="100%" height="230" fit="cover" lazy-load :src="course.cover || defaultCover" />
                    <div class="category"> {{ course.pointsRules }}</div>
                </div>
                <div class="timeRange">
                    {{ course.hostingStart }} 至 {{ course.hostingEnd }}
                </div>
                <div class="title">
                    {{ course.title }}
                </div>
                <div class="introduce">
                    {{ course.courseLocation }}
                </div>
            </div>
        </van-cell>
    </div>
</template>

<style scoped lang="less">
.container {
    width: 100%;

    header {}

    .course {
        width: 660px;
        height: 600px;
        border-radius: 10px;
        margin-top: 18px;
        border: 1px solid black;
        overflow: hidden;

        .category {
            position: absolute;
            padding: 3px 20px;
            border-radius: 27px;
            background-color: #65AAEA;
            color: white;
            left: 61%;
            top: 60%;
        }

        .timeRange,
        .title,
        .introduce {
            text-align: left;
            margin-left: 20px;
            margin-bottom: 13px;
        }

        .timeRange {
            color: #5BA092;
        }

        .title {
            font-size: 48px;
            font-family: Gen Jyuu Gothic;
            line-height: 32px;
            color: rgb(121, 121, 121);
        }

        .introduce {
            font-weight: 300;
        }
    }
}
</style>