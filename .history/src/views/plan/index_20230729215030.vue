<script setup lang="ts">

</script>

<template>
    <div class="container">
        <van-sticky :offset-top="0">
            <header>
                <div>课程规划</div>
                <div class="tools"></div>
            </header>
        </van-sticky>
    </div>
</template>

<style scoped lang="less">
.container {
    width: 100%;

    header {
        height: 140px;
        width: 100vw;
        background-color: aqua;
    }
}
</style>