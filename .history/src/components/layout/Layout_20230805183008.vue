<script setup lang="ts">
import { ref } from "vue";
const tabbar = ref([
  {
    path: "/home",
    icon: "column",
    title: "首页",
  },
  {
    path: "/plan",
    icon: "cluster",
    title: "课程规划",
  },
  {
    path: '/messageBox',
    icon: '',
    title: '考评消息'
  },
  {
    path: "/user",
    icon: "setting",
    title: "个人中心",
  },
]);
</script>

<template>
  <div class="container">
    <div class="main">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>

    <div>
      <van-tabbar route safe-area-inset-top safe-area-inset-bottom inactive-color="#BEBAB3" active-color="#E3562A">
        <van-tabbar-item replace v-for="(item, index) in tabbar" :key="index" :to="item.path" :icon="item.icon">
          {{ item.title }}
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<style lang="less" scoped>
:deep(.van-tabbar) {
  border-radius: 18px 18px 0px 0px;
  overflow: hidden;
  box-sizing: border-box;
  border: 2px solid #bebab3;
  height: calc(var(--van-tabbar-height) + 8px);
}

.main {
  width: 100vw;
  height: calc(100vh - var(--van-tabbar-height));
  margin-bottom: var(--van-tabbar-height);
}
</style>
