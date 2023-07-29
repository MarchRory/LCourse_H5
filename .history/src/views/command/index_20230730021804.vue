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

<style scoped lang="less"></style>