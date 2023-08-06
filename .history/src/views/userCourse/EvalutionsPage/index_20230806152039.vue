<script setup lang="ts">
import { useUserStore } from '@/store/modules/user/index';
import { reactive, defineAsyncComponent } from 'vue'
import rq from '@/api/courses/courses'
import router from '@/router';
const skeleton = defineAsyncComponent(
    () => import('@/components/coursePageSkeleton/coursePageSkeleton.vue')
);
const defaultCover = ref('');
(async () => {
    let dc = await import("@/assets/imgs/Cool-Kids-Discussion.png");
    defaultCover.value = dc.default;
})();
const themeVars = reactive({
    navBarTextColor: "#e1562a",
    navBarIconColor: "#e1562a",
});
const EvaluationList = ref([] as any)
const temp = ref([
    {
        title: '一米菜园除草',
        checked: true,
        couseId: 1,
        text: '<强>1。不返回任何内容。这使得返回值未定义，并且这是向父 Promise 发出的一个信号，表明这里没有其他异步操作需要等待，因此 Promise 链可以继续运行后续步骤在链中。<强>2。返回一个 Promise。这告诉父 Promise 您想要将一个 Promise“插入”到链中，并且在该 Promise 得到解决之前不应调用以下 .then() 处理程序。该链本质上会等待这个 promise 。如果这个新的 Promise 最终得到解决，下一个 .then() 处理程序将被调用。如果这个新的 Promise 最终被拒绝，则将调用下一个 .catch() 处理程序。<强>3。抛出异常。这告诉父 Promise .then() 处理程序中的操作失败，并且父 Promise 链立即被拒绝，并且下一个 .catch() 处理程序将被调用。因此，在您的情况下，如果 doSomethingElse() 是一个异步操作，并且您没有返回与该异步操作相关的 promise ，那么您只是“分支”了您的 promise 链成两个独立的链。主父链将继续调用下一个 .then() 处理程序，因为您没有返回任何内容。同时，您的 doSomethingElse() 函数本质上是它自己的并行 promise 链。它甚至可以有自己的 .then() 处理程序，如下所示:',
        score: 6,
        cover: ''
    }
])
const hasTotal = ref(0)
const page = ref(1)
const pageSize = ref(10)             // 关于刷新的Size选择, 先留着，后面看有没有什么对Size的一些处理需求
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
    if (!finished.value) {
        loading.value = true
        rq.getEvalutionsList({
            page: page.value,
            pageSize: pageSize.value
        }).then((res: any) => {
            if (res.code == 200) {
                const { list, total } = res.data
                hasTotal.value = total

                // 没有考评消息
                if (total == 0) {
                    finished.value = true
                    loading.value = false
                    return;
                }

                // 有考评消息
                if (EvaluationList.value.length < total) {
                    list.forEach((item: any) => {
                        EvaluationList.value.push(item)
                    });
                }
            }
        }).then(() => {
            if (EvaluationList.value.length === hasTotal) {
                finished.value = true
            }
        }).finally(() => {
            loading.value = false
        })
    }
}
getEvalutionList()

const refreshList = () => {
    page.value = 1;
    EvaluationList.value = [];
    reLoad.value = true;
    (async () => {
        getEvalutionList()
    })()
        .finally(() => {
            reLoad.value = false
        })

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
                    <van-empty v-if="hasTotal" description="当前暂无考评消息" />

                    <div class="list">
                        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了"
                            @load="getEvalutionList">
                            <van-cell v-for="(item, index) in temp" :key="index">
                                <div class="eachEvaluation">
                                    <div class="Info">
                                        <van-image width="160px" height="96px" fit="cover" :src="item.cover || defaultCover"
                                            lazy-load>
                                            <template v-slot:loading>
                                                <van-loading type="spinner" size="20" />
                                            </template>
                                        </van-image>
                                        <div class="baseInfo">
                                            <div class="title">
                                                {{ item.title }}
                                            </div>
                                            <div class="rate">
                                                <van-rate v-model="item.score" readonly allow-half />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <article>
                                            {{ item.text }}
                                        </article>
                                    </div>
                                </div>
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

        .eachEvaluation {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            margin-bottom: 20px;

            .Info {
                display: flex;
                flex-direction: row;
                align-items: center;
                width: calc(100vw - 60px);
                height: 180px;
                padding: 10px 30px 10px 30px;
                justify-content: space-between;
                background-color: rebeccapurple;

                .baseInfo {
                    background-color: aqua;
                    width: calc(100vw - 60px - 120px);
                    height: 100%;

                    .title {
                        font-size: 30px;

                        text-align: left;
                        word-wrap: break-word;
                        word-break: break-all;
                        text-indent: 2em;
                    }
                }
            }

            article {
                padding: 15px 25px 10px 120px;
                text-align: left;
                word-wrap: break-word;
                word-break: break-all;
                text-indent: 2em;

            }
        }
    }
}
</style>