<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const back = () => {
    router.go(-1)
}
</script>

<template>
    <div @click="back" id="backButton">
        <van-icon name="arrow-left" size="22" />
    </div>
</template>

<style lang="less" scoped>
#backButton {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent
}
</style>