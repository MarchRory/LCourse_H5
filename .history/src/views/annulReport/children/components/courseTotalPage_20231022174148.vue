<script setup lang="ts">
import { computed, onMounted, defineAsyncComponent } from "vue";
import { gsap } from "gsap";
import { getKeyByValueInMap } from "@/utils/dataUtil/map";
const props = defineProps<{
  courseTotal: number;
  monthDetails: Map<String, String>;
  courseTimeTotal: string;
}>();
const MonthScoreChart = defineAsyncComponent(
  () => import("../charts/monthScore.vue")
);
const tl = gsap.timeline();
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
const chartLoad = ref(false);
const maxMonth = ref<String>();
function initHeaderAnimation() {
  setTimeout(() => {
    chartLoad.value = true;
  }, 3500);
  tl.from(".text", {
    duration: 3,
    scale: 0,
    opacity: 0,
    stagger: 0.5,
  }).to(".text", {
    opacity: 1,
    scale: 1,
  });
}
function getMaxMonth() {
  let longestTime = Math.max(...Object.values(props.monthDetails).map(Number));
  maxMonth.value = getKeyByValueInMap(props.monthDetails, longestTime);
}
watch(
  () => props.courseTotal,
  () => {}
);
onMounted(() => {
  initHeaderAnimation();
  getMaxMonth();
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
    <MonthScoreChart v-if="chartLoad" class="chartBox" :data="monthDetails" />
    <div>{{ maxMonth }}</div>
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
  .chartBox {
    position: absolute;
    width: 650px;
    height: 600px;
  }
}
.numberStyle {
  font-size: 80px;
}
</style>
