<script setup>
import { useUserStore } from '@/store/modules/user';
import { ref, reactive, onMounted } from 'vue'
import rq from '@/api/user/user'
import { showFailToast } from 'vant';
import 'vant/es/toast/style';
import router from '@/router/index'
import autoprefixer from 'autoprefixer';
const loginForm = reactive({
    username: '',
    passwords: ''
})
const isShowPwd = ref('password')
const logoSrc = ref('')
const loadLogo = async () => {
    let logo = await import("@/assets/schoolLogo.jpg")
    logoSrc.value = logo.default
}
const showPwd = () => {
    isShowPwd.value = isShowPwd.value == 'password' ? 'text' : 'password'
}
const onSubmit = (values) => {
    if (values) {
        rq.login(values)
            .then((res) => {
                if (res.code == 200) {
                    const userStore = useUserStore()
                    const { data } = res
                    userStore.init(data)
                        .then(res => {
                            /*                             rq.getInfo(data)
                                                            .then(res => {
                                                                console.log('res: ', res)
                                                                if (res.code == 200) {
                                                                    userStore.initInfo(res.data)
                                                                        .then(() => {
                                                                            router.replace({ path: '/mainPage' })
                                                                        })
                                                                } else {
                                                                    showFailToast('网络异常, 请稍后重试')
                                                                }
                                                            }) */
                            router.replace({ path: '/mainPage' })
                        })
                } else {
                    showFailToast('网络异常, 请稍后重试')
                }
            })
    }
}

const auth = () => {
    let url = window.location.href
    console.log('getUrl: ', url)
    const params = url.split('#/')[1]
    console.log('params: ', params)
    if (params) {

    }
}

// 跳转到找回密码页面
const toFindPWd = () => {

}

// 跳转到注册页面
const toRegister = () => {

}

onMounted(() => {
    auth()
    //loadLogo()
})
</script>

<template>
    <div class="container">
        <div class="cover">
            <van-image width="250" height="250" fit="cover" position="center" :src="logoSrc" />
        </div>
        <div class="content">
            <span style="color: #787877; font-size: 30px; margin-top: -10px;">登录</span>
            <span style="color: #949390; letter-spacing: 0px; font-size: 15px;">使用XXX账号登录</span>
        </div>
        <div class="loginForm">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field v-model="loginForm.username" name="username" label="账号" placeholder="请输入账号"
                        :rules="[{ required: true, message: '请填写用户名' }]" />
                    <van-field v-model="loginForm.passwords" :type="isShowPwd" name="password" label="密码"
                        placeholder="请输入密码" :rules="[{ required: true, message: '请填写密码' }]">

                        <template #button>
                            <span @click="showPwd">
                                <van-icon name="closed-eye" v-if="isShowPwd === 'password'" />
                                <van-icon name="eye-o" v-else />
                            </span>
                        </template>
                    </van-field>
                </van-cell-group>
                <div class="tools">
                    <van-button round block native-type="submit" class="button">登录</van-button>
                    <span class="greyFont" @click="toFindPWd"> 忘记密码? </span>
                </div>
            </van-form>
        </div>
    </div>
</template>

<style scoped lang="less">
:deep(.van-field) {
    border-radius: 12px;
    padding: 16px;
    align-self: stretch;
    gap: 16px;
    background: #FFFFFF;
    border: 1px solid #BEBAB3;
    box-sizing: border-box;

    .van-field__label {
        width: 3.2em;
        color: #78746D;
    }
}

:deep(.van-button) {
    border-radius: 16px;
    background: #E3562A;
    border: 0;
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

    .loginForm {
        .tools {
            height: 150px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .greyFont {
            font-size: 25px;
            color: #78746D;
        }

        .button {
            color: #FFFFFF;
            font-family: Gen Jyuu Gothic;
            letter-spacing: 0px;
            line-height: 18px;
            font-weight: 100;
        }
    }
}
</style>