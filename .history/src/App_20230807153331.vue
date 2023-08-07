<template>
  <div id="app">
    <div>
      <router-view v-slot="{ Component }">
        <transition :name="transitionName" mode="out-in">
          <keep-alive :include="['home', 'user', 'plan', 'userCourse']">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
let transitionName = ref('')
const router = useRouter()

router.beforeEach((to: any, from: any) => {
  // 一级页面进入二级页面
  if (from.meta.index <= to.meta.index) {
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



  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: all 0.3s ease;
    position: absolute !important;
    background-color: white;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
  }

  .slide-left-enter-from,
  .slide-right-leave-to {
    opacity: 0.3;
    transform: translateX(100%);
  }

  .slide-right-enter-from,
  .slide-left-leave-to {
    opacity: 0.3;
    transform: translateX(-50%);
  }

  .slide-left-leave-to,
  .slide-right-leave-to {
    opacity: 0.3;
  }
}
</style>
