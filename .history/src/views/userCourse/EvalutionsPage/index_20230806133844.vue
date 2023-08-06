<script setup lang="ts">
import { useUserStore } from '@/store/modules/user/index';
import { reactive, defineAsyncComponent } from 'vue'
import rq from '@/api/courses/courses'
import router from '@/router';
import { listProps } from 'vant';
const skeleton = defineAsyncComponent(
    () => import('@/components/coursePageSkeleton/coursePageSkeleton.vue')
)
const themeVars = reactive({
    navBarTextColor: "#e1562a",
    navBarIconColor: "#e1562a",
});
const EvaluationList = ref([] as any)
const page = ref(1)
const reLoad = ref(false)
const listLoading = ref(false)
const loading = ref(false)
const finished = ref(false)
const userStore = useUserStore()
const back = () => {
    router.back()
}
const readAll = () => {
    if (userStore.EvaluationsCnt) {
        rq.evaluationsCheckAll()
            .then((res: any) => {
                if (res.code == 200) {
                    userStore.EvaluationsCnt = 0
                }
            })
    }
}
const getEvalutionList = () => {
    rq.getEvalutionsList({
        page: page.value,
        pageSize: 10
    }).then((res: any) => {
        if (res.code == 200) {
            const { list, total } = res.data
            if (EvaluationList.value.length < total) {
                list.forEach((item: any) => {
                    EvaluationList.value.push(item)
                });
            }
            if (EvaluationList.value.length == total) {

            }
        }
    })
}
getEvalutionList()

const refreshList = () => {
    page.value = 1
    getEvalutionList()

}

</script>

<template>
    <div class="container">
        <van-config-provider :theme-vars="themeVars">
            <van-nav-bar @click-right="readAll" left-text="返回" left-arrow @click-left="back">

                <template #title><span style="color: #e1562a">考评信息</span></template>
                <template #right>
                    <span style="color: #e1562a">全部已读</span>
                </template>
            </van-nav-bar>
            <skeleton :skeLoad="listLoading" v-if="listLoading"></skeleton>
            <div class="mainBox" v-else>
                <van-pull-refresh v-model="reLoad" @refresh="refreshList">
                    <div class="list">
                        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了"
                            @load="getEvalutionList">
                            <van-cell v-for="(item, index) in EvaluationList" :key="index">

                            </van-cell>
                        </van-list>
                    </div>
                </van-pull-refresh>
            </div>
        </van-config-provider>

    </div>
</template>

<style lang="less" scoped>
.container {
    width: 100vw;

    .mainBox {
        width: 100vw;
        height: calc(100vh - var(--van-nav-bar-height));
        background-color: #f5f6f8;
        overflow-x: hidden;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
}
</style>