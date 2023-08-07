<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition :name="transitionName" mode="out-in">
        <keep-alive :include="['home', 'user', 'plan', 'userCourse']">
          <div>
            <component :is="Component" />
          </div>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate } from 'vue-router';
import { ref } from 'vue';
let transitionName = ref('')

onBeforeRouteUpdate((to: any, from: any) => {
  // 一级页面进入二级页面
  if (from.meta.index < to.meta.index) {
    transitionName.value = 'slide-left'
  } else { //二级页面向上一个页面回退
    transitionName.value = 'slide-right'
  }
})

</script>

<style lang="less">
body {
  display: block;
}

#app {
  padding: 0;

  .van-sticky--fixed {
    background-color: white;
    padding-top: 30px;
    padding-bottom: 20px;
  }

  ::-webkit-scrollbar {
    display: none;
  }


  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: all 8s ease;
  }

  .slide-right-enter-from {
    opacity: 1;
    transform: translate3d(-100%, 0, 0);
  }

  .slide-right-leave-active {
    opacity: 1;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-enter-from {
    opacity: 1;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-leave-active {
    opacity: 1;
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
