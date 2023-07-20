<script setup lang="ts">

</script>

<template>
    <div class="container">
        <div class="cover">
            <img src="" alt="">
        </div>
        <div class="content">
            <span> 登录 </span>
            <span> 使用XXX账号登录 </span>
        </div>
        <div class="loginForm">

        </div>
        <div class="tools">
            <span> 忘记密码? </span>
            <van-button id="loginButton" @click="loginForm">主要按钮</van-button>
            <span> 注册 </span>
        </div>
    </div>
</template>

<style scoped lang="less">
.container {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    div {
        margin-bottom: 10px;
    }

    .tools {

        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>