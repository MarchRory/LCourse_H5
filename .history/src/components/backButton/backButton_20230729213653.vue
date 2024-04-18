<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()

const back = () => {
    route.go(-1)
}
</script>

<template>
    <div class="backButton">

    </div>
</template>

<style lang="less" scoped></style>