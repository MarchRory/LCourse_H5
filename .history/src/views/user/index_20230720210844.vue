<script setup>
import { useUserStore } from '@/store/modules/user';
import { logout } from '@/api/user/user'
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