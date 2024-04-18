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
  enterDuration: 5,
  leaveDuration: 2,
  stagger: 0.8,
};
function initAnimation() {
  tl.to(".text", {
    keyframes: {
      "0%": {
        scale: 0.3,
        opacity: 0.3,
        color: "transparent",
        textShadow: "0px 0px 25px #000000",
      },
      "60%": {
        scale: 0.8,
        opacity: 0.7,
        color: "black",
        textShadow: "0 0 0px #000000",
      },
      "70%": {
        scale: 0.9,
        textShadow: "0 0 0px #000000",
        opacity: 0.5,
        ease: "linear",
      },
      "100%": {
        scale: 1.1,
        textShadow: "0px 0px 40px #000000",
        color: "transparent",
        ease: "linear",
        opacity: 0,
      },
    },
    ease: "none",
    duration: animationConfig.enterDuration,
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
