<script setup>
import { useUserStore } from '@/store/modules/user';
import rq from '@/api/user/user'
const useStore = useUserStore()

const logout = () => {
    rq.logOut().then(res => {
        if (res.code == 200) {
            useStore.logOut()
        }
    })
}
</script>

<template>
    <div>
        <van-button type="warning" @click="logout">登出</van-button>
    </div>
</template>

<style scoped lang="less"></style>