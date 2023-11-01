<script setup lang="ts">
import { getAnnualReportDetailAPI } from "@/api/annulReport/annulReport";
import { annulReportItem } from "@/api/types/annualReport";
import { useRoute, useRouter } from "vue-router";
import { Response } from "@/utils/http/types";
import { AxiosRequestConfig } from "axios";
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
  getAnnualReportDetailAPI(
    route.query.reportId as string,
    {
      onDownloadProgress: function (e) {
        console.log("downloadEvent: ", e);
        let progress = Math.floor((e.loaded / (e.total as number)) * 100);
      },
    } as AxiosRequestConfig
  ).then((res: Response<annulReportItem>) => {
    const { data } = res;
    annualReportInfo.value = data;
  });
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
    <div id="waitngBackendLoading"><van-loading color="#0094ff" /></div>
  </div>
</template>

<style scoped lang="less">
#backBtn {
  position: fixed;
  z-index: 999;
  left: 40px;
  top: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: rgba(189, 189, 189, 0.89);
  color: white;
  font-weight: 800;
  backdrop-filter: blur(10px);
}
#waitngBackendLoading {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  padding: 30px;
  background-color: rgba(189, 189, 189, 0.623);
  backdrop-filter: blur(10px);
}
</style>
