<script setup lang="ts">
import { ref, onMounted, computed, defineAsyncComponent } from "vue";
import { scoreDetailType } from "@/api/types/annualReport/index";
import { gsap } from "gsap";
const props = defineProps<{
  scoreDetails: scoreDetailType;
  ranking: number;
}>();
const chartLoaded = ref(false);
const ScoreAndRankingChart = defineAsyncComponent(
  () => import("../charts/scoreDetailChart.vue")
);
const maxScoreCategory = computed(() => {
  let maxScore = Math.max(...Object.values(props.ranking).map(Number));
  return Object.keys(props.scoreDetails).find(
    (key) => props.scoreDetails[key] == maxScore
  );
});
const tl = gsap.timeline();
const animationDurationCtrl = {};
function initChartAnimation() {}
function initAnimation() {}

onMounted(() => {});
</script>

<template>
  <div class="container">
    <ScoreAndRankingChart
      class="chart"
      v-show="chartLoaded"
      :score-details="scoreDetails"
    />
    {{ maxScoreCategory }}
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100%;
}
.chart {
  position: absolute;
  width: 700px;
  height: 700px;
}
</style>
