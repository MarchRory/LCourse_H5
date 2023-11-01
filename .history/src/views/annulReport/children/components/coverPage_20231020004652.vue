<script setup lang="ts">
import { gsap } from "gsap";
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();
const props = defineProps<{
  batch: string;
}>();
</script>

<template>
  <div class="container">
    <header>
      <div>学年即将进入尾声</div>
      <p>@ {{ userStore.name }}</p>
    </header>
    <div class="main"></div>
    <footer></footer>
  </div>
</template>

<style scoped lang="less">
.container {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
}
header {
  padding: 20px 0;
  width: 100vw;
  height: 10vh;
  background-color: aqua;
}
.main {
  width: 100vw;
  height: 65vh;
  background-color: orange;
}
footer {
  width: 100vw;
  height: 25vh;
  background-color: teal;
}
</style>
