<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { annualReportKeyword } from "@/api/types/annualReport/index";

const props = defineProps<{
  keywordsList: annualReportKeyword;
}>();
</script>

<template>
  <div class="mainBox"></div>
</template>

<style scoped lang="less">
.mainBox {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
