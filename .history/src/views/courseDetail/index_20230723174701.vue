<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute()
const courseId = route.params.courseId

const join = () => {

}

</script>

<template>
    <div>
        <h1> 临时报名使用, 后台需要数据, 做这个页面时候记得删 </h1>
        <van-button type="default" @click="join">报名</van-button>
    </div>
</template>

<style scoped lang="less"></style>