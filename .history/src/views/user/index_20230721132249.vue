<script setup>
import { useUserStore } from '@/store/modules/user';
const useStore = useUserStore()


</script>

<template>
    <div class="container">
        <div class="avatar">
            <van-image round width="10rem" height="10rem" fit="cover" position="center"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        </div>
        <div id="notification">

        </div>
        <div id="userInfo">

        </div>
    </div>
</template>

<style scoped lang="less">
:deep(.van-image--round .van-image__img) {
    border: 6px solid #c0e2ff;
}

.container {
    height: calc(100vh - var(--van-tabbar-height));
}
</style>