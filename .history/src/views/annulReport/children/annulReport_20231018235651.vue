<script setup lang="ts">
import { useRoute } from "vue-router";
import { getAnnualReportDetailAPI } from "@/api/annulReport/annulReport";
import {
  annulReportItem,
  annualReportListResultModel,
} from "@/api/types/annualReport/index";
const route = useRoute();
const reportInfo = ref<annulReportItem>({} as annulReportItem);

function getReportDetail() {
  getAnnualReportDetailAPI(route.query.reportId as string).then(
    (res: annulReportItem) => {
      const { data } = res;
      reportInfo.value = data;
    }
  );
}
</script>

<template>
  <div></div>
</template>
