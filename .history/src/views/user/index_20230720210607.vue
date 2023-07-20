<script setup>
import { useUserStore } from '@/store/modules/user';
const useStore = useUserStore()

const logOut = () => {

}
</script>

<template>
    <div>
        <van-button type="warning" @click="logOut">登出</van-button>
    </div>
</template>

<style scoped lang="less"></style>