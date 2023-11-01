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
const pieColorList = ["#73ACFF", "#FDD56A", "#FDB36A", "#FD866A"];
function chartFun() {
  var timer = setInterval(function () {
    myChart.dispatchAction({
      type: "hideTip",
      seriesIndex: 0,
      dataIndex: index,
    });
    // 显示提示框
    myChart.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: index,
    });
    // 取消高亮指定的数据图形
    myChart.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
      dataIndex: index === 0 ? 5 : index - 1,
    });
    myChart.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: index,
    });
    index++;
    if (index > 5) {
      index = 0;
    }
  }, 3000);
}
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
