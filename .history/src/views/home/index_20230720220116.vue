<script setup>
import { useUserStore } from '@/store/modules/user';

const quitLog = () => {
    useUserStore().logOut()
}
</script>

<template>
    <div>
        <van-button type="warning" @click="quitLog">警告按钮</van-button>
    </div>
</template>

<style scoped lang="less"></style>