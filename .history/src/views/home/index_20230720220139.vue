<script setup>
import { useUserStore } from '@/store/modules/user';

const quitLog = () => {
    const useStore = useUserStore()
    useStore.logOut()
}
</script>

<template>
    <div>
        <van-button type="warning" @click="quitLog">警告按钮</van-button>
    </div>
</template>

<style scoped lang="less"></style>