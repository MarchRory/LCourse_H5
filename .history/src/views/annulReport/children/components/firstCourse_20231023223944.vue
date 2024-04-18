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
  enterDuration: 3,
  leaveDuration: 1,
  stagger: 0.8,
};
function initAnimation() {
  tl.from(".text", {
    scale: 0.3,
    color: "transparent",
    textShadow: "0px 0px 25px #000000",
    duration: animationConfig.enterDuration,
  })
    .to(".text", {
      scale: 1,
      color: "black",
      textShadow: "0 0 0px #000000",
      duration: animationConfig.enterDuration,
    })
    .to(".text", {});
}
onMounted(() => {
  if (props.firstCourse) {
    setTimeout(() => {
      initAnimation();
    }, 800);
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
  font-weight: bolder;
  font-family: sans-serif;
}
</style>
