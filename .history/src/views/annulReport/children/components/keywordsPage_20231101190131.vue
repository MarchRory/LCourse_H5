<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { annualReportKeyword } from "@/api/types/annualReport/index";

const props = defineProps<{
  keywordsObj: annualReportKeyword;
}>();
</script>

<template>
  <div class="mainBox">
    <div>你的年度关键词是</div>
    <div>{{}}</div>
  </div>
</template>

<style scoped lang="less">
.mainBox {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
