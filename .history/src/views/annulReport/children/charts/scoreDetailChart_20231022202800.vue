<script setup lang="ts">
import { scoreDetailType } from "@/api/types/annualReport";
import * as echarts from "echarts";
import { ref, onMounted, watch } from "vue";
const porps = defineProps<{
  scoreDetails: scoreDetailType;
}>();
const chart: echarts.ECharts;
const chartLoaded = ref(false);
watch(
  () => chartLoaded.value,
  (newVal) => {
    if (newVal) {
    }
  }
);
</script>

<template>
  <div id="chart" ref="scoreDetailChart" v-show="chartLoaded"></div>
</template>

<style scoped lang="less"></style>
