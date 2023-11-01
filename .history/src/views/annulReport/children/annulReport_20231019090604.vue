<script setup lang="ts">
import { getAnnualReportDetailAPI } from "@/api/annulReport/annulReport";
import { annulReportItem } from "@/api/types/annualReport";
import { useRoute, useRouter } from "vue-router";
import { Response } from "@/utils/http/types";
const route = useRoute();
const router = useRouter();
const annualReportInfo = ref<any>();
function getAnnualReportInfo() {
  getAnnualReportDetailAPI(route.query.reportId as string, {}).then(
    (res: Response<annulReportItem>) => {
      const { data } = res;
      annualReportInfo.value = data;
    }
  );
}
function goBack() {
  router.back();
}
</script>

<template>
  <div></div>
</template>
