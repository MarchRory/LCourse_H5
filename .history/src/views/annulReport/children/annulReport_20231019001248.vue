<script setup lang="ts">
import { useRoute } from "vue-router";
import { getAnnualReportDetailAPI } from "@/api/annulReport/annulReport";
import { annulReportItem } from "@/api/types/annualReport/index";
import { Response } from "@/utils/http/types";
const route = useRoute();
const reportInfo = ref<annulReportItem>({} as annulReportItem);

function getReportDetail() {
  getAnnualReportDetailAPI(route.query.reportId as string).then(
    (res: Response<annulReportItem>) => {
      const { data } = res;
      reportInfo.value = data;
    }
  );
}
</script>

<template>
  <div>666</div>
</template>
