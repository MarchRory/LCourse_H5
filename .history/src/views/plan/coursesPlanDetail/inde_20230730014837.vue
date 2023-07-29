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

    .results-list {
        .list-item {
            border: 0.0625rem solid #ccc;
            border-radius: 0.5rem;
            margin-bottom: 1rem;

            .item-top {
                height: 12.125rem;
                position: relative;
                background: #f8f2ee;
                padding: 1rem 0;

                .item-img {
                    width: 100%;
                    border-top-left-radius: 0.5rem;
                    border-top-right-radius: 0.5rem;
                }

                .item-top-label {
                    right: 1rem;
                    bottom: 0.5rem;
                    position: absolute;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    padding: 0.25rem 1rem;
                    background: #65aaea;
                    border-radius: 0.75rem;
                    color: #f2f2f2;
                    height: 1.5rem;
                    font-size: 0.875rem;
                }
            }

            .item-bottom {
                text-align: left;
                padding: 1rem;

                .time {
                    font-family: Gen Jyuu Gothic;
                    font-size: 0.75rem;
                    color: #5ba092;
                }

                h3 {
                    font-family: Gen Jyuu Gothic;
                    font-size: 1.5rem;
                    color: #3c3a36;
                    font-weight: 100;
                    line-height: 2rem;
                    margin: 0.25rem 0;
                }

                .text {
                    font-family: Gen Jyuu Gothic Monospace;
                    font-size: 0.875rem;
                    font-weight: 200;
                    color: #3c3a36;
                }
            }
        }
    }
}
</style>