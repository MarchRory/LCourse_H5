<template>
  <div id="app">

    <router-view v-slot="{ Component }">
      <transition name="slide-right" mode="out-in">
        <keep-alive include="layOut">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script setup lang="ts"></script>
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
}
</style>
