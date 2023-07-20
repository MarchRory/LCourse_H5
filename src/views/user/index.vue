<script setup>
import { useUserStore } from '@/store/modules/user';
const useStore = useUserStore()

const logout = async () => {
    useStore.logOut()
}
</script>

<template>
    <div>
        <van-button type="warning" @click="logout">登出</van-button>
    </div>
</template>

<style scoped lang="less"></style>