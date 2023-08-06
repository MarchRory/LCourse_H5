<template>
  <div class="info" v-if="showParent">
    <van-nav-bar>
      <template #title><span style="color: #e1562a">个人中心</span></template>
    </van-nav-bar>

    <van-pull-refresh v-model="reLoad" @refresh="refresh">
      <div class="mainBox">
        <van-cell-group>
          <van-cell title="用户名" :value="userInfo.name"
            style="display: flex; align-items: center; justify-content: flex-start;">
            <template #title>
              <van-image round width="5rem" lazy-load height="5rem" :src="userInfo.avatar" />
            </template>
          </van-cell>
          <van-cell title="姓名" :value="userInfo.name" />
          <van-cell title="学号" :value="userInfo.studentId" />
          <van-cell title="信息修改" is-link value="去修改" @click="open" />
        </van-cell-group>
        <van-cell-group title="我的易班">
          <van-cell title="易班账号绑定" value="" is-link @click="bindYiban" />
        </van-cell-group>
        <van-cell-group title="课程信息">
          <van-cell title="历史规划" value="" is-link @click="toUserObjectives" />
        </van-cell-group>
        <van-action-sheet v-model:show="show" cancel-text="取消" close-on-click-action @cancel="onCancel">
          <van-cell-group>
            <van-cell title="个人信息修改" is-link @click="toChangeUserInfo" />
            <van-cell title="密码修改" is-link @click="toChangePwd" />
          </van-cell-group>
        </van-action-sheet>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import "vant/es/cell/style";
import "vant/es/cell-group/style";
import "vant/es/nav-bar/style";
import { useUserStore } from "@/store/modules/user";
import rq from '@/api/user/user'
import { showFailToast, showSuccessToast } from "vant";
const userStore = useUserStore();
const showParent = ref(true);
const route = useRoute()
const router = useRouter();
const show = ref(false);
(() => {
  let query = Object.values(route.query)
  if (query.length && query[0] === true) {
    userStore.init(userStore.token)
      .then(() => {
        rq.getInfo(userStore.token)
          .then((res) => {
            const info = Object.assign(res[0].data.userInfo, res[1].data)
            userStore.initInfo(info)
              .then(res => {
                if (res.code == 200) {
                  showSuccessToast('易班绑定成功')
                } else {
                  showFailToast('遇到错误, 易班绑定失败')
                }
              })
          })
      })
  }
})()

// 在路由更新前，检查是否要隐藏父级路由界面
onBeforeRouteUpdate((to, from, next) => {
  // 在这里根据需要设置是否隐藏父级路由界面
  // 例如，可以根据子路由的名称或路径来判断是否要隐藏
  showParent.value = false;
  next();
});
const reLoad = ref(false)
const userInfo = ref(userStore);
const open = () => {
  show.value = true;
};
const toUserObjectives = () => {
  router.push({ name: "UserObjectives" });
};
const toChangeUserInfo = () => {
  router.push({ name: "UserInfo" });
  onCancel();
};
const toChangePwd = () => {
  router.push({ name: "Password" });
  onCancel();
};
const refresh = () => {
  reLoad.value = true
  rq.getInfo(userStore.token)
    .then((res) => {
      const info = Object.assign(res[0].data.userInfo, res[1].data)
      userStore.initInfo(info)
        .then(res => {
          reLoad.value = false
        })
    })
}
const onCancel = () => {
  show.value = false;
};

const bindYiban = () => {
  rq.yibanBind(userStore.uid)
}
</script>
<style scoped lang="less">
.info {
  height: calc(100vh - var(--van-tabbar-height));
  overflow: hidden;
  background-color: rgb(245, 246, 248);
}

.mainBox {
  width: 100vw;
  height: calc(100vh - var(--van-tabbar-height) - var(--van-nav-bar-height));
}
</style>
