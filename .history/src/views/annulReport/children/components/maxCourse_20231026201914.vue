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
    <header>
      <div>你的</div>
      <div>年度课程</div>
    </header>
    <div class="main">
      <div class="leftSide"></div>
      <div class="rightSide"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.mainBox {
  width: 100%;
  height: 85%;
  header {
    width: 85%;
    height: 13%;
    color: #60381b;
    margin: 0 auto;
    text-align: left;
    font-size: 60px;
    font-weight: 900;
  }
}
</style>
