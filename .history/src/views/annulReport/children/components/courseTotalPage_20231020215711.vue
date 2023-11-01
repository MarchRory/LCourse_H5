<script setup lang="ts">
import { gsap } from "gsap";
const props = defineProps<{
  courseTotal: number;
  monthDetails: Map<String, String>;
  courseTimeTotal: string;
}>();
</script>

<template>
  <div class="container"></div>
</template>

<style scoped lang="less">
.container {
  width: 100vw;
  height: 100vh;
}
</style>
