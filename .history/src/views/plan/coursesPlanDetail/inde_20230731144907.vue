<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted, defineAsyncComponent } from 'vue'
import rqObj from '@/api/objectives/objectives'
import defaultCover from '@/assets/imgs/Cool-Kids-Discussion.png'
import { showFailToast } from 'vant';
const route = useRoute()
const router = useRouter()
const list = ref([] as any)
const skeletonLoad = ref(true)
const objInfo = ref({} as any)
const backBtn = defineAsyncComponent(
    () => import('@/components/backButton/backButton.vue')
)
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
                //skeletonLoad.value = false
            }, 500)
        })
    rqObj.getObjDetail(objId)
        .then((res: any) => {
            const { data } = res
            objInfo.value = data
        })
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
        <van-skeleton title :row="1" :loading="skeletonLoad" :round="true" row-width="375px">
            <van-sticky :offset-top="0">
                <header>
                    <back-btn />
                    <div class="title">{{ objInfo.objectivesName }}</div>
                    <div class="seat"></div>
                </header>
            </van-sticky>
        </van-skeleton>



        <van-skeleton :row="24" :loading="skeletonLoad" :round="true" row-width="375px">
            <van-cell v-if="list.length" v-for="( course, index ) in  list " :key="index" @click="toDetailsBnt(course.id)">
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

            <van-empty v-else description="老师还没有给这个目标分配课程哦" />
        </van-skeleton>
    </div>
</template>

<style scoped lang="less">
.container {
    width: 100%;

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

    .course {
        width: 680px;
        height: 600px;
        border-radius: 10px;
        margin-top: 18px;
        border: 1px solid rgb(132, 132, 132);
        overflow: hidden;

        .category {
            position: absolute;
            padding: 3px 19px;
            border-radius: 27px;
            background-color: #65AAEA;
            color: white;
            left: 60%;
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