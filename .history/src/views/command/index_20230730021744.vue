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
    <div>

    </div>
</template>

<style scoped lang="less"></style>