<script setup lang="ts">
import { useRoute } from "vue-router";
import { getAnnualReportDetailAPI } from "@/api/annulReport/annulReport";
import { annulReportItem } from "@/api/types/index";
const route = useRoute();
const reportInfo = ref<annulReportItem>({} as annulReportItem);

function getReportDetail() {
  getAnnualReportDetailAPI(route.query.reportId).then(
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
