<template>
  <div id="app">
    <router-view />
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
}
</style>
