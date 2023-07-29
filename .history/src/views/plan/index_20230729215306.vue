<script setup lang="ts">

</script>

<template>
    <div class="container">
        <van-sticky :offset-top="0">
            <header>
                <div class="temp" style="width: 30vw;"></div>
                <div class="title">
                    <span>课</span>程 <span>规</span> 划
                </div>
                <div class="tools">
                    <van-icon name="apps-o" />
                </div>
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
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }
}
</style>