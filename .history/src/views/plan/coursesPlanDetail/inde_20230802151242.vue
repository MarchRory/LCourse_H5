<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, defineAsyncComponent } from 'vue'
import rqObj from '@/api/objectives/objectives'
import { showFailToast } from 'vant';
const route = useRoute()
const hasPass = ref(0)
const list = ref([] as any)
const skeletonLoad = ref(true)
const objInfo = ref({} as any)
const echarts = inject('$echarts')
const backBtn = defineAsyncComponent(
    () => import('@/components/backButton/backButton.vue')
)
const courseSke = defineAsyncComponent(
    () => import('@/components/coursePageSkeleton/coursePageSkeleton.vue')
)
const course = defineAsyncComponent(
    () => import('@/components/coursePreview/coursePreview.vue')
)
const isShowStats = ref(true)
const showStats = () => {
    isShowStats.value = true
}
onMounted(() => {
    let objId = Number(route.query.id)
    Promise.all([rqObj.getObjDetail(objId), rqObj.getObjCourses(objId)])
        .then((res: any) => {
            if (res[0].code == 200 && res[1].code == 200) {
                console.log('objInfo: ', res[0].data)
                console.log('list: ', res[1].data.list)
                objInfo.value = res[0].data
                list.value = res[1].data.list
                res[1].data.list.forEach((item: any) => {
                    hasPass.value += item.signUpstate == 4 ? 1 : 0
                });
            } else {
                showFailToast('网络异常, 课程信息获取失败')
            }
        })
        .finally(() => {
            skeletonLoad.value = false
        })
    rqObj.getObjDetail(objId)
        .then((res: any) => {
            const { data } = res
            objInfo.value = data
        })
})

const reLoad = ref(false)
const refresh = () => {
    reLoad.value = true
    rqObj.getObjCourses(Number(route.query.id))
        .then((res: any) => {
            if (res.code == 200) {
                list.value = res.data.list
            }
        })
        .finally(() => {
            reLoad.value = false
        })
}
</script>

<template>
    <course-ske :ske-load="skeletonLoad"></course-ske>

    <div class="container" v-if="!skeletonLoad">
        <header ref="header">
            <back-btn />
            <div class="title">{{ objInfo.objectivesName }}</div>
            <div class="tools" @click="showStats">
                <van-icon name="bar-chart-o" size="32" />
            </div>
        </header>

        <van-pull-refresh v-model="reLoad" @refresh="refresh">
            <div v-if="list && list.length" class="list">
                <van-cell v-for="( course, index ) in  list " :key="index">
                    <course :course="course"></course>
                </van-cell>
            </div>
            <van-empty v-else description="老师还没有给这个目标分配课程哦" />
        </van-pull-refresh>
    </div>

    <van-popup v-model:show="isShowStats" round position="top" :style="{ height: '400px' }">
        <div class="popup-container">
            <div id="chartTitle">
                <div>
                    {{ objInfo.objectivesName }}
                </div>
            </div>

            <div id="otherInfo">
                <div>已完成修读课程: {{ hasPass }}</div>
                <div>该目标安排课程: {{ list.length }}</div>
            </div>

            <div id="chartBox">
                <div id="chart"></div>
            </div>
        </div>
    </van-popup>
</template>

<style scoped lang="less">
.container {
    width: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;

    header {
        height: 140px;
        width: calc(100vw - 70px);
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

    .list {
        margin-top: 10px;
        overflow-y: auto;
        height: calc(100vh - 150px);
        background-color: rgb(245, 246, 248);
    }
}

.popup-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    #chartTitle {
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        div {
            padding-left: 20px;
            padding-right: 30px;
            width: 90%;
            font-size: 35px;
            font-weight: bold;
            letter-spacing: 1px;
            text-align: left;
            border-left: 10px solid rgb(254, 144, 26);
            margin-left: 5%;
            margin-top: 5%;
        }
    }

    #chartBox {
        width: 95%;
        height: 380px;
        background-color: aqua;
    }

    #otherInfo {
        width: 95%;
        height: 190px;
        margin-top: 30px;
        margin-bottom: 30px;
        background-color: red;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

}
</style>