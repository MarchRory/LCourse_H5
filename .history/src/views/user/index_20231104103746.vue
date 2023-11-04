<template>
  <div class="info" v-if="showParent">
    <van-pull-refresh v-model="reLoad" @refresh="refresh">
      <van-nav-bar right-text="登出" @click-right="logOut">
        <template #title><span style="color: #e1562a">个人中心</span></template>
      </van-nav-bar>
      <div class="mainBox" @touchmove.stop>
        <van-cell-group>
          <van-cell
            title="用户名"
            :value="userInfo.name"
            style="
              display: flex;
              align-items: center;
              justify-content: flex-start;
            "
          >
            <template #title>
              <van-image
                round
                width="5rem"
                lazy-load
                height="5rem"
                :src="userInfo.avatar"
              />
            </template>
          </van-cell>
          <van-cell title="姓名" :value="userInfo.realName" />
          <van-cell title="学号" :value="userInfo.studentId" />
          <van-cell title="校区" :value="userInfo.campus" />
          <van-cell title="学院" :value="userInfo.department" />
          <van-cell title="专业" :value="userInfo.major" />

          <van-cell title="信息修改" is-link value="去修改" @click="open" />
        </van-cell-group>
        <van-cell-group title="我的易班">
          <van-cell
            v-if="userStore.hasBind"
            title="易班账号绑定"
            value="已绑定"
          />
          <van-cell
            v-else
            title="易班账号绑定"
            value="去绑定"
            is-link
            @click="bindYiban"
          />
          <van-cell
            title="劳动二课年度报告"
            value="查看"
            is-link
            @click="openAnnulReport"
          />
        </van-cell-group>
        <van-cell-group title="课程信息">
          <van-cell
            title="历史规划"
            value=""
            is-link
            @click="toUserObjectives"
          />
        </van-cell-group>
        <!--         <van-cell-group title="登录相关">
          <van-cell title="退出登录" value="" is-link @click="logOut" />
        </van-cell-group> -->
        <van-action-sheet
          v-model:show="show"
          cancel-text="取消"
          close-on-click-action
          @cancel="onCancel"
        >
          <van-cell-group>
            <van-cell title="个人信息修改" is-link @click="toChangeUserInfo" />
            <van-cell title="密码修改" is-link @click="toChangePwd" />
          </van-cell-group>
        </van-action-sheet>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script setup name="user">
import "vant/es/cell/style";
import "vant/es/cell-group/style";
import "vant/es/nav-bar/style";
import { useUserStore } from "@/store/modules/user";
import { showConfirmDialog } from "vant";
import { yibanBind, getInfo } from "@/api/user/user";
import { showFailToast, showSuccessToast } from "vant";
const userStore = useUserStore();
const showParent = ref(true);
const route = useRoute();
const router = useRouter();
const show = ref(false);
{
  let query = Object.values(route.query);
  if (query.length && query.includes(true)) {
    userStore.init(userStore.token).then(() => {
      getInfo(userStore.token).then((res) => {
        const { studentId, name, pass, evaluate, department } = res[1].data;
        const objUser = {
          studentId,
          name,
          pass,
          evaluate,
          department,
        };
        const { userInfo, nowSemester } = res[0].data;
        const info = Object.assign(userInfo, nowSemester, objUser);
        userStore.initInfo(info).then((res) => {
          if (info.hasBind) {
            showSuccessToast("易班绑定成功");
          } else {
            showFailToast("遇到错误, 易班绑定失败");
          }
        });
      });
    });
  }
}

// 在路由更新前，检查是否要隐藏父级路由界面
onBeforeRouteUpdate((to, from, next) => {
  // 在这里根据需要设置是否隐藏父级路由界面
  // 例如，可以根据子路由的名称或路径来判断是否要隐藏
  showParent.value = false;
  next();
});
const reLoad = ref(false);
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
  reLoad.value = true;
  getInfo(userStore.token).then((res) => {
    const { studentId, name, pass, evaluate, department } = res[1].data;
    const objUser = {
      studentId,
      name,
      pass,
      evaluate,
      department,
    };
    const { userInfo, nowSemester } = res[0].data;
    const info = Object.assign(userInfo, nowSemester, objUser);
    userStore.initInfo(info).then((res) => {
      reLoad.value = false;
    });
  });
};
const onCancel = () => {
  show.value = false;
};

const logOut = () => {
  showConfirmDialog({
    title: "退出登录",
    message: "确定要退出当前登录的账号吗? ",
  })
    .then(() => {
      // on confirm
      userStore.logOut();
    })
    .catch(() => {
      // on cancel
    });
};

const bindYiban = () => {
  yibanBind(userStore.uid);
};
const openAnnulReport = () => {
  router.push({ name: "annulReportList" });
};
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
