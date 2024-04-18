<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()

const back = () => {
    route.go(-1)
}
</script>

<template>
    <div @click="back" id="backButton">
        <van-icon name="arrow-left" size="25" />
    </div>
</template>

<style lang="less" scoped>
#backButton {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid black;
}
</style>