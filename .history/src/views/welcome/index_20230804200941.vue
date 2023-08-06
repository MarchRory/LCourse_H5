<script setup>
import { onMounted } from "vue";
import rq from "@/api/user/user";
import router from "@/router/index";
import { getToken } from "@/utils/auth/auth";


const init = () => {
  let oldtoken = getToken()
  if (oldtoken) {
    getUserInfo(oldtoken)
  } else {
    const token = window.location.href.split('/?')[1].split('=')[1].split('#/')[0]
    getUserInfo(token)
  }
}

const getUserInfo = (token) => {
  userStore.init(token)
    .then(() => {
      rq.getInfo(token)
        .then((res) => {
          const info = Object.assign(res[0].data.userInfo, res[1].data)
          userStore.initInfo(info)
            .then(res => {
              setTimeout(() => {
                router.replace({ path: '/home' })
              }, 800)
            })
        })
    })
}

onMounted(() => {
  if (!getToken()) {
    rq.yibanLogin();
  } else {
    router.push({ path: "/wait" });
  }
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