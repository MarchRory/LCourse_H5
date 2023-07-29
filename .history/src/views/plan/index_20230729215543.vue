<script setup lang="ts">

</script>

<template>
    <div class="container">
        <van-sticky :offset-top="0">
            <header>
                <div class="title">
                    <span>课</span>程 <span>规</span> 划
                </div>
                <div class="tools">
                    <van-icon name="apps-o" size="35" />
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
        width: calc(100vw - 40px);
        background-color: aqua;
        display: flex;
        padding-left: 20px;
        padding-right: 20px;

        .title {
            position: absolute;
            margin: 0 auto;
            font-family: Gen Jyuu Gothic;
            font-size: 40px;
            font-weight: 500;
            line-height: 32px;
            text-align: center;
            letter-spacing: -0.5px;
        }
    }
}
</style>