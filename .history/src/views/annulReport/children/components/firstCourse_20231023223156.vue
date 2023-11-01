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
  enterDuration: 4,
  leaveDuration: 1,
  stagger: 0.8,
};
function initAnimation() {
  tl.from(".text", {
    scale: 0.5,
    color: "transparent",
    textShadowBlur: 1,
    textShadow: "0px 0px 25px #000000",
    textShadowColor: "rgb(0, 0, 0)",
    duration: animationConfig.enterDuration,
  }).to(".text", {
    scale: 1,
    color: "black",
    textShadowBlur: 0,
    textShadow: "0 0 5px #000000",
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
