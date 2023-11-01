<script setup lang="ts">
import { computed, onMounted, defineAsyncComponent } from "vue";
import { gsap } from "gsap";
const props = defineProps<{
  courseTotal: number;
  monthDetails: Map<String, String>;
  courseTimeTotal: string;
}>();
const MonthScoreChart = defineAsyncComponent(
  () => import("../charts/monthScore.vue")
);
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

function initHeaderAnimation() {
  headerTL.from(".text", {
    duration: 1.5,
    scale: 0,
    opacity: 0,
    stagger: 0.5,
  });
  headerTL.to(".text", {
    duration: 1,
    opacity: 1,
    scale: 1,
    stagger: 0.5,
  });
}
watch(
  () => props.courseTotal,
  () => {}
);
onMounted(() => {
  initHeaderAnimation();
});
</script>

<template>
  <div class="container">
    <header>
      <div class="text">今年你一共参加了</div>
      <div class="text">
        <span class="numberStyle">{{ props.courseTotal }}</span
        >门劳动二课
      </div>
      <div class="text totalTime">{{ props.courseTimeTotal }}</div>
    </header>
    <MonthScoreChart id="chartBox" :data="monthDetails" />
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
    color: rgb(23, 86, 145);
    .totalTime {
      font-size: 35px;
      padding-top: 5px;
    }
  }
  #chartBox {
    position: absolute;
    width: 500px;
    height: 500px;
    padding: 20px;
    background-color: aqua;
  }
}
.numberStyle {
  font-size: 80px;
}
</style>
