<script setup lang="ts"></script>

<template>
  <div>
    <div id="waitngBackendLoading">
      <van-loading color="#e77230" vertical>正在统计数据</van-loading>
    </div>
  </div>
</template>

<style scoped>
#waitngBackendLoading {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  padding: 30px;
  background-color: #e2e2e29c;
  backdrop-filter: blur(10px);
}
</style>
