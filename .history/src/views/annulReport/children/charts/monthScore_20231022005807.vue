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
    /*     formatter: "参加课程<br/>{b}月: {c}门",
    borderColor: "rgba(78, 160, 236, 1)", */
  },
  title: {
    text: "分月统计",
    subtext: "让劳动成为习惯",
    left: "center",
    top: "top",
    textStyle: {
      fontSize: 20,
      color: "rgba(21, 137, 153, 1)",
    },
    subtextStyle: {
      fontSize: 10,
      fontFamily: "Arial",
    },
  },
  grid: {
    top: "25%",
    left: "5%",
    right: "10%",
    bottom: "5%",
    containLabel: true,
  },
  xAxis: [
    {
      name: "月份/月",
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
      name: "参加课程/门",
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
      name: "参加课程",
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
      data: Object.values(props.data).map(Number),
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
