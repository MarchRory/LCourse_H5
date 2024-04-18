<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()

const back = () => {
    route.go(-1)
}
</script>

<template>
    <div class="backButton">
        <div class="backButton">
            <van-icon name="arrow-left" size="25" />
        </div>
    </div>
</template>

<style lang="less" scoped></style>