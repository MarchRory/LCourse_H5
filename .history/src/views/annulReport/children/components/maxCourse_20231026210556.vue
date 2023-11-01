<script setup lang="ts">
import { coursesItem } from "@/api/types/courses";
import { gsap } from "gsap";
import { ref, watch } from "vue";
const props = defineProps<{
  maxCourse: coursesItem[];
}>();
const tl = gsap.timeline();
const cuboidColor = [
  "#78b4f1",
  "#5e75e7",
  "#2dcfcf",
  "#8540df",
  "#9add99",
  "#ef9453",
  "#81451a",
];
</script>
<template>
  <div class="mainBox">
    <header>
      <div>你的</div>
      <div>年度课程</div>
    </header>
    <div class="main">
      <div class="leftSide">
        <transition-group>
          <div class="cuboid">
            <div class="cuboid-top"></div>
            <div class="cuboid-ahead"></div>
            <div class="cuboid-aside"></div>
          </div>
        </transition-group>
        <div></div>
      </div>
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
