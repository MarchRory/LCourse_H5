<script setup lang="ts">
import defaultCover from '@/assets/imgs/Cool-Kids-Discussion.png'
import { useUserStore } from '@/store/modules/user';
import router from "@/router/index";
import { defineAsyncComponent } from 'vue'
const userStore = useUserStore()
const backBtn = defineAsyncComponent(
    () => import('@/components/backButton/backButton.vue')
)


</script>

<template>
    <div class="container">
        <van-sticky :offset-top="0">
            <header>
                <back-btn />
                <div class="title">{{ objInfo.objectivesName }}</div>
                <div class="seat"></div>
            </header>
        </van-sticky>
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
}
</style>