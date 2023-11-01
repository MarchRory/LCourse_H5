<script setup lang="ts">
import { ref, onMounted, computed, defineAsyncComponent } from "vue";
import { scoreDetailType } from "@/api/types/annualReport/index";
import { gsap } from "gsap";
const props = defineProps<{
  scoreDetails: scoreDetailType;
  ranking: number;
}>();
const ScoreAndRankingChart = defineAsyncComponent(
  () => import("../charts/scoreDetailChart.vue")
);
const maxScoreCategory = computed(() => {
  let maxScore = Math.max(...Object.values(props.ranking).map(Number));
  return Object.keys(props.scoreDetails).find(
    (key) => props.scoreDetails[key] == maxScore
  );
});
console.log(props.scoreDetails);
onMounted(() => {});
</script>

<template>
  <div>
    <ScoreAndRankingChart class="chart" :score-details="scoreDetails" />
  </div>
</template>

<style lang="less" scoped>
.chart {
  position: absolute;
  width: 500px;
  height: 500px;
}
</style>
