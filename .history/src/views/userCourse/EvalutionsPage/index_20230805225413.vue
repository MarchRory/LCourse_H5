<script setup lang="ts">
import { useUserStore } from '@/store/modules/user/index';
import { reactive, defineAsyncComponent } from 'vue'
import rq from '@/api/courses/courses'
import router from '@/router';
const skeleton = defineAsyncComponent(
    () => import('@/components/coursePageSkeleton/coursePageSkeleton.vue')
)
const themeVars = reactive({
    navBarTextColor: "#e1562a",
    navBarIconColor: "#e1562a",
});
const reLoad = ref(false)
const listLoading = ref(false)
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
        page: 1,
        pageSize: 100
    }).then((res: any) => {
        console.log(res)
        if (res.code == 200) {
            const { list, total } = res.data
        }
    })
}
getEvalutionList()

const refreashList = () => {
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
            <!--             <van-dropdown-menu active-color="#e1562a">
                <van-dropdown-item v-model="state" :options="option" />
            </van-dropdown-menu> -->
            <skeleton :skeLoad="listLoading" v-if="listLoading"></skeleton>
            <div class="mainBox" v-else>
                <van-pull-refresh v-model="reLoad" @refresh="refreshList">
                    <div class="list">
                        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                            <van-cell v-for="(item, index) in list" :key="index">
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
    background-color: #f5f6f8;

    .mainBox {
        width: 100vw;
        height: calc(100vh - var(--van-nav-bar-height));
        background-color: red;
        overflow-x: hidden;
        overflow-y: auto;
    }
}
</style>