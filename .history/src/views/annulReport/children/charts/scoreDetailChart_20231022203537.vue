<script setup lang="ts">
import { scoreDetailType } from "@/api/types/annualReport";
import * as echarts from "echarts";
import { ref, onMounted, watch, computed } from "vue";
import { gasp } from "gsap";
const props = defineProps<{
  scoreDetails: scoreDetailType;
}>();
var chart: echarts.ECharts;
const chartLoaded = ref(false);
const scoreDetailChart = ref<HTMLElement>();
const option = {};
function initChart() {
  if (!props.scoreDetails) {
    return;
  }
  (async () => {
    if (!chart) {
      chart = echarts.init(scoreDetailChart.value);
    }
    chart.setOption(option);
  })().finally(() => {
    chartLoaded.value = true;
  });
}
function initChartAnimaition() {
  gsap.fromTo(".chart", {}, {});
}
const name;
watch(
  () => chartLoaded.value,
  (newVal) => {
    if (newVal) {
      initChartAnimaition();
    }
  }
);
</script>

<template>
  <div class="chart" ref="scoreDetailChart" v-show="chartLoaded"></div>
</template>

<style scoped lang="less"></style>
