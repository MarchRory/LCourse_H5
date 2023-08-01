<template>
  <div>
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
        <template #title><span style="color: #e1562a">个人信息修改</span></template></van-nav-bar>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field name="uploader" label="头像">
            <template #input>
              <van-uploader v-model="files" :after-read="afterRead" :before-read="beforeRead" :max-count="1">
                <van-image width="60" height="60" :src="avatar" />
              </van-uploader>
            </template>
          </van-field>
          <van-field v-model="nickname" name="昵称" label="昵称" placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]" />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="warning" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </van-config-provider>
  </div>
</template>

<script setup>
import { useUserStore } from "@/store/modules/user";
import upload from "@/api/upload/upload.ts";
import userApi from "@/api/user/user.ts";
import { showFailToast, showSuccessToast, showToast, Toast } from "vant";
const themeVars = reactive({
  navBarTextColor: "#e1562a",
  navBarIconColor: "#e1562a",
});
const router = useRouter();
const userStore = useUserStore();
const files = ref([]);
const nickname = ref(userStore.name);
const avatar = ref(userStore.avatar);
const afterRead = (file) => {
  upload.setAvatar(file.file).then((res) => {
    avatar.value = res.data;
  });
};
const beforeRead = (file) => {
  if (file.type !== "image/jpeg") {
    Toast("请上传 jpg 格式图片");
    return false;
  }
  return true;
};
const onSubmit = () => {
  userApi
    .updateUser({
      id: userStore.uid,
      nickname: nickname.value,
      avatar: avatar.value,
    })
    .then((res) => {
      if (res.code == 200) {
        userStore.avatar = avatar.value;
        userStore.name = nickname.value
        showSuccessToast("信息更换成功");
        router.go(-1);
      } else {
        showFailToast(res.message);
      }
    });
};
const onClickLeft = () => {
  router.back();
};
</script>

<style scoped></style>
