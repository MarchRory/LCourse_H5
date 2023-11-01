<script setup lang="ts">
import { getAnnualReportDetailAPI } from "@/api/annulReport/annulReport";
import { annulReportItem } from "@/api/types/annualReport";
import { useRoute, useRouter } from "vue-router";
import { Response } from "@/utils/http/types";
const route = useRoute();
const router = useRouter();
const annualReportInfo = ref<any>({
  /*       courseTotal: 12,
    scoreDetail: 
    courseTimeTotal: 56,
    maxCourse: 
    maxEvaluate: any
    maxScoreCategory: string
    firstCourse: any
    maxCourseMonth: string
    maxCourseMonthCount: number
    keyword: string[]
    ranking: number */
});
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
  <div>
    <div id="backBtn">
      <van-icon name="arrow-left" size="18" @click="goBack" />
    </div>
  </div>
</template>

<style scoped lang="less">
#backBtn {
  position: fixed;
  left: 40px;
  top: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: rgba(189, 189, 189, 0.89);
  color: white;
  font-weight: bold;
}
</style>
