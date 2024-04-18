<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/all";
import { coursesItem } from "@/api/types/courses";
gsap.registerPlugin(TextPlugin);
const props = defineProps<{
  firstCourse: coursesItem;
}>();
const tl = gsap.timeline();
const animationConfig = {
  enterDuration: 1,
  leaveDuration: 1,
  stagger: 0.7,
};
function initAnimation() {
  tl.from(".text", {
    text: {},
    scale: 1.5,
    blur: 20,
    duration: animationConfig.enterDuration,
  }).to(".text", {
    scale: 1,
    blur: 0,
    duration: animationConfig.enterDuration,
  });
}
onMounted(() => {
  if (props.firstCourse) {
    initAnimation();
  }
});
</script>

<template>
  <div class="mainBox">
    <span class="text">千里之行, 始于足下</span>
    <br /><br />
    <span class="text">这一年的故事, 从这里开始...</span>
  </div>
</template>

<style scoped lang="less">
.mainBox {
  width: 85%;
}
.text {
  font-size: 30px;
  font-weight: bolder;
  font-family: sans-serif;
}
</style>
