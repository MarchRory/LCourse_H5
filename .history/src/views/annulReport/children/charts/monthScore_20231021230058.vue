<script setup lang="ts">
import * as echarts from "echarts";
const props = defineProps<{
  data: { name: string; value: number }[];
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
      type: "category",
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
      name: "案件",
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
</script>

<template>
  <div></div>
</template>
