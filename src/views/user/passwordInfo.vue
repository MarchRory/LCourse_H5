<template>
  <van-config-provider :theme-vars="themeVars">
    <div>
      <van-nav-bar
        title="密码修改"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="oldPassword"
            type="password"
            name="原密码"
            label="原密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
            v-model="newPassword"
            type="password"
            name="新密码"
            label="新密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="warning" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </van-config-provider>
</template>

<script setup>
import userApi from "@/api/user/user.ts";
import { showToast } from "vant";
const router = useRouter();
const oldPassword = ref("");
const newPassword = ref("");
const themeVars = reactive({
  navBarTextColor: "#e1562a",
  navBarIconColor: "#e1562a",
});
const onSubmit = () => {
  userApi
    .resetPassword({
      newPassword: newPassword.value,
      oldPassword: oldPassword.value,
    })
    .then((res) => {
      showToast(res.message);
    });
};
const onClickLeft = () => {
  router.back();
};
</script>

<style scoped></style>
