<script setup lang="ts">
import { useUserStore } from '@/store/modules/user/index';
import { reactive, defineAsyncComponent } from 'vue'
import rq from '@/api/courses/courses'
import router from '@/router';
import { showNotify } from 'vant';
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
const openDetail = (courseId: number) => {
    router.push({ path: "/detail", query: { courseId } })
}
const readAll = () => {
    if (userStore.EvaluationsCnt) {
        rq.evaluationsCheckAll()
            .then((res: any) => {
                if (res.code == 200) {
                    userStore.EvaluationsCnt = 0
                    EvaluationList.value.forEach((item: any, index: number) => {
                        if (!item.checked) {
                            EvaluationList.value[index].checked = true
                        }
                    })
                    showNotify({ type: 'success', message: '一键已读完成' });
                }
            })
    } else {
        showNotify({ type: 'warning', message: '当前没有新的考评信息' });
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
                        item.score = 5 * (item.score / 100)
                        EvaluationList.value.push(item)
                    });
                }
            }
        }).then(() => {
            if (EvaluationList.value.length === hasTotal.value) {
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
    finished.value = false
    reLoad.value = true;
    (async () => {
        getEvalutionList()
    })()
        .finally(() => {
            setTimeout(() => {
                reLoad.value = false
            }, 400)
        })
}


</script>

<template>
    <div class="container">
        <van-config-provider :theme-vars="themeVars">
            <van-nav-bar @click-right="readAll" left-text="返回" left-arrow @click-left="back">

                <template #title><span style="color: #e1562a">考评信息</span></template>
                <template #right v-if="hasTotal">
                    <span style="color: #e1562a">全部已读</span>
                </template>
            </van-nav-bar>
            <skeleton :skeLoad="listLoading" v-if="listLoading"></skeleton>
            <div class="mainBox" v-else>
                <van-empty v-if="!hasTotal" description="当前暂无考评消息" />
                <div v-else class="list">
                    <van-skeleton v-show="reLoad">
                        <template #template>
                            <div :style="{ display: 'flex', width: '100%', justifyContent: 'flex-start' }">
                                <van-skeleton-image />
                                <div :style="{ flex: 1, marginLeft: '16px' }">
                                    <van-skeleton-paragraph row-width="60%" />
                                    <van-skeleton-paragraph />
                                    <van-skeleton-paragraph />
                                    <van-skeleton-paragraph />
                                </div>
                            </div>
                        </template>
                    </van-skeleton>
                    <van-pull-refresh v-show="!reLoad" v-model="reLoad" @refresh="refreshList">
                        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了"
                            @load="getEvalutionList">
                            <van-cell v-for="(item, index) in EvaluationList" :key="index"
                                @click="openDetail(item.courseId)"
                                :style="{ backgroundColor: item.checked ? '#f1f1f1' : '#ffffff' }">
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
                    </van-pull-refresh>
                </div>

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

        :deep(.van-pull-refresh) {
            overflow-y: auto;
            height: calc(100vh - var(--van-nav-bar-height));
        }

        .eachEvaluation {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;

            .Info {
                display: flex;
                flex-direction: row;
                align-items: center;
                width: calc(100vw - 60px);
                height: 180px;
                padding: 10px 30px 10px 30px;
                justify-content: space-between;

                :deep(.van-image) {
                    background-color: bisque;
                    border-radius: 10px;
                    overflow: hidden;
                    border: 4px solid #f06622d1;
                }

                .baseInfo {
                    width: calc(100vw - 60px - 120px);
                    height: 100%;

                    .title {
                        font-size: 33px;
                        font-weight: 600;
                        padding-left: 20px;
                        color: #575252;
                        letter-spacing: 2px;
                        height: 70%;
                        text-align: left;
                        word-wrap: break-word;
                        word-break: break-all;
                    }

                    .rate {
                        text-align: left;
                        padding-left: 20px;
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