<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { annualReportKeyword } from "@/api/types/annualReport/index";

const props = defineProps<{
  keywordsList: annualReportKeyword;
}>();
</script>

<template>
  <div></div>
</template>

<style scoped lang="less"></style>
