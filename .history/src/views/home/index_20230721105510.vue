<script setup>
import { useUserStore } from '@/store/modules/user';

const quitLog = () => {
    const useStore = useUserStore()
    useStore.logOut()
}
</script>

<template>
    <div>
        <van-button type="warning" @click="quitLog">登出</van-button>
    </div>
</template>

<style scoped lang="less"></style>