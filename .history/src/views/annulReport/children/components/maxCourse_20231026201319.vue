<script setup lang="ts">
import { coursesItem } from "@/api/types/courses";
import { gsap } from "gsap";
import { ref, watch } from "vue";
const props = defineProps<{
  maxCourse: coursesItem[];
}>();
const tl = gsap.timeline();
</script>
<template>
  <div class="mainBox">
    <header></header>
    <div class="main">
      <div class="leftSide"></div>
      <div class="rightSide"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.mainBox {
  width: 100%;
  height: 90%;
  background-color: aqua;
  header {
    width: 80%;
    height: 13%;
    background-color: rebeccapurple;
  }
}
</style>
