<template>
  <van-config-provider :theme-vars="themeVars">
    <div>
      <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
        <template #title><span style="color: #e1562a">密码修改</span></template>
      </van-nav-bar>
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

<script>
export default {
  name: "updatePwd",
};
</script>
<script setup>
import { resetPassword } from "@/api/user/user";
import { showToast } from "vant";
const router = useRouter();
const oldPassword = ref("");
const newPassword = ref("");
const themeVars = reactive({
  navBarTextColor: "#e1562a",
  navBarIconColor: "#e1562a",
});
const onSubmit = () => {
  resetPassword({
    newPassword: newPassword.value,
    oldPassword: oldPassword.value,
  }).then((res) => {
    showToast(res.message);
  });
};
const onClickLeft = () => {
  router.back();
};
</script>

<style scoped></style>
