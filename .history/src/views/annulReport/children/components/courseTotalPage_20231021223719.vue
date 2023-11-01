<script setup lang="ts">
import { computed, onMounted } from "vue";
import { gsap } from "gsap";
import { init } from "echarts";
const props = defineProps<{
  courseTotal: number;
  monthDetails: Map<String, String>;
  courseTimeTotal: string;
}>();
const headerTL = gsap.timeline();
function onContextEnter(el, done) {
  console.log(el);
  gsap.to(el, {
    autoAlpha: 1,
    opacity: 1,
    scale: 1,
    transformOrigin: "center center",
    stagger: 0.6,
  });
}
function onContextLeave(el, done) {
  console.log(el);
  gsap.to(el, {
    opacity: 0,
    yPercent: -10,
    onComplete: done,
  });
}

function initHeaderAnimation() {}
watch(
  () => props.courseTotal,
  () => {}
);
onMounted(() => {
  /* initHeaderAnimation(); */
});
</script>

<template>
  <div class="container">
    <header>
      <p class="text">今年你一共参加了</p>
      <p class="text">
        <span class="numberStyle">{{ props.courseTotal }}</span
        >门劳动二课
      </p>
    </header>
  </div>
</template>

<style scoped lang="less">
.container {
  width: 100vw;
  height: 100%;
  header {
    position: relative;
    bottom: 35%;
    font-size: 55px;
    font-weight: 900;
    opacity: 0;
    color: rgb(23, 86, 145);
  }
}
.numberStyle {
  font-size: 80px;
}
</style>
