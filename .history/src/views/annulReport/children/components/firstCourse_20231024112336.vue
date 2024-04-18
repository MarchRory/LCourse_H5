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
  leaveDuration: 1.5,
  stagger: 0.8,
};
function initAnimation() {
  tl.from(".text", {
    scale: 0.2,
    color: "transparent",
    textShadow: "0px 0px 25px #000000",
    duration: animationConfig.enterDuration,
  })
    .to(".text", {
      scale: 0.6,
      color: "black",
      textShadow: "0 0 0px #000000",
      duration: animationConfig.enterDuration,
    })
    .to(".text", {
      textShadow: "0 0 0px #000000",
      opacity: 1,
      duration: animationConfig.leaveDuration,
    })
    .to(".text", {
      scale: 1.5,
      textShadow: "0px 0px 40px #000000",
      color: "transparent",
      opacity: 0,
      duration: animationConfig.leaveDuration,
    });
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
    <div class="text">千里之行, 始于足下</div>
    <div class="text">这一年的故事, 从这里开始...</div>
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
