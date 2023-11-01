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
      <div>同学, 今年也很努力呀</div>
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
</style>
