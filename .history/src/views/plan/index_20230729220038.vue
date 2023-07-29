<script setup lang="ts">

</script>

<template>
    <div class="container">
        <van-sticky :offset-top="0">
            <header>
                <div class="temp" style="width: 12vw;"></div>
                <div class="title">
                    课<span style="color: #939392; font-weight: 200;">程</span>规<span style="color: #939392;">划</span>
                </div>
                <div class="tools">
                    <van-icon name="apps-o" size="32" />
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
        display: flex;
        padding-left: 20px;
        padding-right: 20px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .title {
            font-family: Gen Jyuu Gothic;
            font-size: 42px;
            font-weight: 500;
            line-height: 32px;
            text-align: center;
            letter-spacing: 5px;
        }
    }
}
</style>