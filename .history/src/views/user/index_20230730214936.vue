<template>
  <div class="info" v-if="showParent">
    <van-nav-bar title="个人中心" />
    <van-cell-group>
      <van-cell title="用户名" :value="userInfo.name">
        <template #title>
          <van-image round width="3rem" height="3rem" :src="userInfo.avatar" />
        </template>
      </van-cell>
      <van-cell title="姓名" :value="userInfo.name" />
      <van-cell title="学号" :value="userInfo.studentId" />
      <van-cell title="信息修改" is-link value="去修改" @click="open" />
    </van-cell-group>
    <van-cell-group title="课程信息">
      <van-cell title="我的课程" value="" is-link @click="toUserCourse" />
      <van-cell title="历史目标" value="" is-link />
    </van-cell-group>
    <van-action-sheet v-model:show="show" cancel-text="取消" close-on-click-action @cancel="onCancel">
      <van-cell-group>
        <van-cell title="个人信息修改" is-link @click="toChangeUserInfo" />
        <van-cell title="密码修改" is-link @click="toChangePwd" />
      </van-cell-group>
    </van-action-sheet>
  </div>
</template>

<script setup>
import "vant/es/cell/style";
import "vant/es/cell-group/style";
import "vant/es/nav-bar/style";
import { useUserStore } from "@/store/modules/user";
const showParent = ref(true);
const router = useRouter();
const show = ref(false);
// 在路由更新前，检查是否要隐藏父级路由界面
onBeforeRouteUpdate((to, from, next) => {
  // 在这里根据需要设置是否隐藏父级路由界面
  // 例如，可以根据子路由的名称或路径来判断是否要隐藏
  showParent.value = false;
  next();
});
const userStore = useUserStore();
const userInfo = ref(userStore);
const open = () => {
  show.value = true;
};
const toUserCourse = () => {
  router.push({ name: "UserCourse" });
};
const toChangeUserInfo = () => {
  router.push({ name: "UserInfo" });
  onCancel();
};
const toChangePwd = () => {
  router.push({ name: "Password" });
  onCancel();
};
const onCancel = () => {
  show.value = false;
};
</script>
<style scoped lang="less">
.info {
  height: 1200px;
  background-color: rgb(245, 246, 248);
}
</style>
