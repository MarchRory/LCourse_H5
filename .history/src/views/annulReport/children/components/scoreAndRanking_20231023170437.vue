<script setup lang="ts">
import { ref, onMounted, computed, defineAsyncComponent } from "vue";
import { scoreDetailType } from "@/api/types/annualReport/index";
import { gsap } from "gsap";
const props = defineProps<{
  scoreDetails: scoreDetailType;
  ranking: number;
}>();
const chartLoaded = ref(false);
const isTextLoaded = ref(false);
const ScoreAndRankingChart = defineAsyncComponent(
  () => import("../charts/scoreDetailChart.vue")
);
const maxScoreCategory = computed(() => {
  let maxScore = Math.max(...Object.values(props.scoreDetails).map(Number));
  return Object.keys(props.scoreDetails).find(
    (key) => props.scoreDetails[key] == maxScore
  );
});
const tl = gsap.timeline();
const animationDurationCtrl = {
  chartDuration: 1,
  textDuration: 1.2,
  textStagger: 1,
};
function initAnimation() {
  chartLoaded.value = true;
  setTimeout(() => {
    isTextLoaded.value = true;
  }, animationDurationCtrl.chartDuration);
}
function initTextAnimation() {
  tl.from(".footerText span", {
    yPercent: 15,
    opacity: 0.7,
    duration: animationDurationCtrl.textDuration,
    stagger: animationDurationCtrl.textStagger,
  }).to(".footerText span", {
    opacity: 1,
    yPercent: 0,
  });
}
onMounted(() => {
  if (props.scoreDetails) {
    initAnimation();
  }
});
watch(
  () => isTextLoaded.value,
  (newVal) => {
    if (newVal) {
      initTextAnimation();
    }
  }
);
</script>

<template>
  <div class="container">
    <ScoreAndRankingChart
      class="chart"
      v-show="chartLoaded"
      :animation-duration="animationDurationCtrl.chartDuration"
      :score-details="scoreDetails"
    />
    <div class="footerText" v-if="isTextLoaded">
      <span style="font-size: 30px">这一年, 你热衷于</span><br />
      <span class="maxScoreCategory">{{ maxScoreCategory }}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vw;
  display: flex;
  flex-direction: column;
}
.chart {
  width: 95%;
  height: 60%;
  background-color: #c88c67;
}
.footerText {
  height: calc(100% - 700px);
  width: 75%;
  color: #c88c67;
  font-weight: bold;
  background-color: aquamarine;
}
.maxScoreCategory {
  font-size: 80px;
}
</style>
