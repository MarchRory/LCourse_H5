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
const isVisible = ref(false);
const animationConfig = {
  enterDuration: 1,
  leaveDuration: 1,
  stagger: 0.8,
};
function initAnimation() {
  tl.from(".text", {
    color: "transparent",
    textShadow: "0px 0px 30px #000000",
    duration: animationConfig.enterDuration,
  }).to(".text", {
    color: "black",
    textShadow: "0 0 0 #000000",
    duration: animationConfig.enterDuration,
  });
}
onMounted(() => {
  if (props.firstCourse) {
    setTimeout(() => {
      // isVisible.value = true;
      initAnimation();
    }, 800);
  }
});
</script>

<template>
  <div class="mainBox" v-show="isVisible">
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
