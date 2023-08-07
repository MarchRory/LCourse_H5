<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition :name="transitionName">
        <keep-alive :include="['home', 'user', 'plan', 'userCourse']">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
let transitionName = ref('')
const router = useRouter()

router.beforeEach((to: any, from: any) => {
  // 一级页面进入二级页面
  if (from.meta.index < to.meta.index) {
    transitionName.value = 'slider-left'
  } else { //二级页面向上一个页面回退
    transitionName.value = 'slider-right'
  }
})

</script>

<style lang="less">
body {
  display: block;
}

#app {
  padding: 0;
  display: flex;
  width: 200%;
  overflow-x: hidden;

  .van-sticky--fixed {
    background-color: white;
    padding-top: 30px;
    padding-bottom: 20px;
  }

  ::-webkit-scrollbar {
    display: none;
  }


}
</style>
