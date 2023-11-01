<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, watch, ref } from "vue";
const props = defineProps<{
  data: Map<String, String>;
}>();
const option = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      data: Object.keys(props.data),
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#82b0ec",
        },
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#82b0ec",
        },
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "#aaa",
        },
      },
    },
  ],
  series: [
    {
      name: "时间",
      type: "bar",
      barWidth: "25%",
      itemStyle: {
        normal: {
          color: "#277ace",
          barBorderRadius: 50,
          borderWidth: 0,
          borderColor: "#333",
        },
      },
      data: Object.values(props.data),
    },
  ],
};
var chart: echarts.ECharts;
const chartLoaded = ref(false);
const monthScoreChart = ref<HTMLDivElement>();
function initChart() {
  (async () => {
    if (!chart) {
      chart = echarts.init(monthScoreChart.value);
    }
    chart.setOption(option);
  })().finally(() => {
    chartLoaded.value = true;
  });
}
onMounted(() => {
  initChart();
});
watch(
  () => props.data,
  () => {
    initChart();
  }
);
</script>

<template>
  <div v-show="chartLoaded" ref="monthScoreChart"></div>
</template>
