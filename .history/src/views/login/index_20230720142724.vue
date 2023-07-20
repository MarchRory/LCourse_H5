<!-- <script lang="ts">
export default {
    data() {
        return {
            username: '',
            passwords: '',
            logoSrc: require('@/assets/schoolLogo.jpg')
        }
    },
    onMounted() {

    },
    methods: {
        submit() {

        }
    }
}
</script> -->
<script setup>
import { ref, reactive, onMounted } from 'vue'
const loginForm = reactive({
    username: '',
    passwords: ''
})
const logoSrc = ref('')
const loadLogo = async () => {
    let logo = await import("@/assets/schoolLogo.jpg")
    logoSrc.value = logo.default
}

onMounted(() => {
    loadLogo()
})
</script>

<template>
    <div class="container">
        <div class="cover">
            <van-image width="250" height="250" fit="cover" position="center" :src="logoSrc" />
        </div>
        <div class="content">
            <span style="color: #3C3A36; font-size: 30px;">登录</span>
            <span style="color: #78746D; letter-spacing: 0px; font-size: 15px;">使用XXX账号登录</span>
        </div>
        <div class="loginForm">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field v-model="username" name="用户名" label="账号" placeholder="请输入账号"
                        :rules="[{ required: true, message: '请填写用户名' }]" />
                    <van-field v-model="passwords" type="password" name="密码" label="密码" placeholder="请输入密码"
                        :rules="[{ required: true, message: '请填写密码' }]" />
                </van-cell-group>
                <div style="margin: 16px;">
                    <span> 忘记密码? </span>
                    <van-button round block type="primary" native-type="submit">登录</van-button>
                    <span> 注册 </span>
                </div>
            </van-form>
        </div>
    </div>
</template>

<style scoped lang="less">
ul {
    list-style: none;
}

.container {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 0 16px;

    div {
        margin-bottom: 30px;
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 105px;

        span {
            line-height: 32px;
            text-align: center;
            letter-spacing: -0.5px;
            font-family: Gen Jyuu Gothic;
        }
    }

    .tools {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>