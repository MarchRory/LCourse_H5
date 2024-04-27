<script setup>
import { useUserStore } from "@/store/modules/user";
import { ref, reactive, onMounted, onBeforeMount } from "vue";
import { login, yibanLogin } from "@/api/user/user";
import { showFailToast } from "vant";
import { Loading } from "vant";
import router from "@/router/index";
import { getToken } from "@/utils/auth/auth";
import logoSrc from "@/assets/schoolLogo.jpg";

const userStore = useUserStore();
const loginForm = reactive({
  username: "",
  passwords: "",
});
const isShowPwd = ref("password");
const showPwd = () => {
  isShowPwd.value = isShowPwd.value == "password" ? "text" : "password";
};
const onSubmit = (values) => {
  if (values) {
    login(values).then((res) => {
      if (res.code == 200) {
        const userStore = useUserStore();
        const { data } = res;
        userStore.init(data).then((res) => {
          router.replace({ path: "/wait" });
        });
      } else {
        showFailToast(res.message);
      }
    });
  }
};

const authLogin = () => {
  yibanLogin();
};

() => {
  if (getToken()) {
    router.replace({ path: "/wait" });
  }
};
</script>

<template>
  <div class="container">
    <div class="cover">
      <!-- <van-image
        width="250"
        height="250"
        fit="cover"
        position="center"
        :src="logoSrc"
      /> -->
    </div>
    <div class="content">
      <span style="color: black; font-size: 30px; margin-top: -31px">登录</span>
      <!-- <span style="color: #949390; letter-spacing: 0px; font-size: 15px"
        >选择登录方式</span
      > -->
    </div>
    <div class="loginForm">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="loginForm.username"
            name="username"
            label="账号"
            placeholder="请输入账号"
            :rules="[{ required: true, message: '请填写用户名' }]"
            style="color: white"
          />
          <van-field
            v-model="loginForm.passwords"
            :type="isShowPwd"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
            autocomplete="false"
          >
            <template #button>
              <span @click="showPwd" style="color: black">
                <van-icon name="closed-eye" v-if="isShowPwd === 'password'" />
                <van-icon name="eye-o" v-else />
              </span>
            </template>
          </van-field>
        </van-cell-group>
        <div class="tools">
          <van-button round block native-type="submit" class="button"
            >账号密码登录</van-button
          >
          <van-button round block class="button authButton" @click="authLogin"
            >易班授权登录</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<style scoped lang="less">
:deep(.van-cell-group){
  background-color: transparent
}
:deep(.van-field) {
  padding: 16px;
  align-self: stretch;
  gap: 16px;
  border: 6px solid black;
  box-sizing: border-box;
  // background-color: black;

  input {
    // background-color: white;
    color: black;
    &::placeholder {
      color: #151514;
    }
  }

  .van-field__label {
    width: 3.2em;
    color: black;
  }
}


:deep(.van-button) {
  border-radius: 16px;
  background: -webkit-linear-gradient(right, #8e2de2, #4a00e0);
  border: 0;
}

/**  loading  */
:deep(.van-overlay) {
  display: flex;
  align-items: center;
  justify-content: center;

  .van-loading {
    .flex-c-c {
      flex-direction: column;
    }
  }
}

.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 0 16px;
  height: 100vh;
  background: url("@/assets/imgs/cover.jpg") center no-repeat;
  background-size: cover;

  div {
    border-radius: 0;
    margin-bottom: 30px;
    // background-color: #151514
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 105px;
    color: white;

    span {
      line-height: 32px;
      text-align: center;
      letter-spacing: -0.5px;
      font-family: Gen Jyuu Gothic;
    }
  }

  .loginForm {
    .tools {
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .greyFont {
      font-size: 25px;
      color: #151514;
    }

    .button {
      color: #ffffff;
      font-family: Gen Jyuu Gothic;
      letter-spacing: 0px;
      line-height: 18px;
      font-weight: 500;
    }

    :deep(.authButton) {
      color: black;
      background: white;
    }
  }
}
</style>
