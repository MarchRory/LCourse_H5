<script setup lang="ts">
import defaultCover from '@/assets/imgs/Cool-Kids-Discussion.png'
import { useUserStore } from '@/store/modules/user';
import router from "@/router/index";
import { defineAsyncComponent } from 'vue'
const userStore = useUserStore()
const backBtn = defineAsyncComponent(
    () => import('@/components/backButton/backButton.vue')
)
const toCourse = ref('')
const toSelf = ref('')
const checked = ref(false)
</script>

<template>
    <div class="container">
        <van-sticky :offset-top="0">
            <header>
                <back-btn />
                <div class="title">xxxxxx</div>
                <div class="seat"></div>
            </header>
        </van-sticky>

        <div class="main">
            <van-image width="94%" height="230" fit="cover" lazy-load :src="defaultCover" />
            <div class="commentToCourse">
                <div style="text-align: left;margin-left: 20px;">课程评价</div>
                <van-cell-group inset>
                    <van-field v-model="toCourse" rows="4" autosize maxlength="150" type="textarea" show-word-limit
                        placeholder="请输入对课程的评价" />
                </van-cell-group>
                <div>
                    <van-switch v-model="checked" @change="handleSwitchChange" size="22px" active-color="#5BA092"
                        inactive-color="#dcdee0" />
                    匿名评价
                </div>
            </div>
            <div class="commmentToSelf">
                <div style="text-align: left;margin-left: 20px;">自我评价</div>
                <van-cell-group inset>
                    <van-field v-model="toSelf" rows="4" autosize maxlength="150" type="textarea" show-word-limit
                        placeholder="请输入自己参加课程的感受" />
                </van-cell-group>
            </div>
        </div>

        <van-button type="warning" size="large">发布评价</van-button>
    </div>
</template>

<style scoped lang="less">
.container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    overflow-y: auto;

    div {
        margin-bottom: 20px;
    }

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

    .main {
        :deep(.van-image__img) {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            border: 1px solid #b8b8b8;
            margin-bottom: 20px;
        }

        :deep(.van-cell-group--inset) {
            border: 1px solid #afafaf;
        }

        .commentsToCourse {
            margin-bottom: 30px;
        }
    }
}
</style>