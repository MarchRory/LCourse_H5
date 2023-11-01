<script setup lang="ts">
import { useRoute } from "vue-router";
import { getAnnualReportDetailAPI } from "@/api/annulReport/annulReport";
import { annulReportItem } from "@/api/types/index";
const route = useRoute();
const reportInfo = ref<annulReportItem>();
</script>

<template>
  <div></div>
</template>
