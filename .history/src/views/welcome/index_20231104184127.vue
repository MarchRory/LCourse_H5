<script setup>
import { onMounted } from "vue";
import { getInfo } from "@/api/user/user";
import router from "@/router/index";
import { getToken, removeToken } from "@/utils/auth/auth";
import { useUserStore } from "@/store/modules/user";

const init = () => {
  let oldtoken = getToken();
  if (oldtoken) {
    getUserInfo(oldtoken);
  } else {
    const token = window.location.href
      .split("/?")[1]
      .split("=")[1]
      .split("#/")[0];
    getUserInfo(token);
  }
};

const getUserInfo = (token) => {
  const userStore = useUserStore();
  userStore.init(token).then(() => {
    getInfo(token)
      .then((res) => {
        const {
          studentId,
          name,
          pass,
          evaluate,
          department,
          major,
          campus,
          sex,
          enrollmentYear,
          contact,
        } = res[1].data;
        const objUser = {
          studentId,
          name,
          pass,
          evaluate,
          department,
          sex,
          enrollmentYear,
          contact,
          major,
          campus,
        };
        const { userInfo, nowSemester } = res[0].data;
        const info = Object.assign(userInfo, nowSemester, objUser);
        userStore.initInfo(info).then((res) => {
          setTimeout(() => {
            router.replace({ path: "/home" });
          }, 800);
        });
      })
      .catch((err) => {
        const { code } = err;
        console.log(err);
        if (code == "ERR_NETWORK") {
          userStore.clearToken().then(() => {
            window.localStorage.clear();
            router.replace({ path: "/", query: { isLogOut: 1 } });
          });
        }
      });
  });
};

onMounted(() => {
  init();
});
</script>

<template>
  <div class="container">
    <van-overlay :show="true">
      <van-loading color="#E3562A" size="100">
        <template #icon>
          <van-icon name="star-o" size="80" />
        </template>
        正在获取数据...
      </van-loading>
    </van-overlay>
  </div>
</template>

<style scoped lang="less">
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
}
</style>
