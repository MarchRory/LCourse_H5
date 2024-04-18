<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()

const back = () => {
    route.go(-1)
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
    border: 2px solid #BEBAB3;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>