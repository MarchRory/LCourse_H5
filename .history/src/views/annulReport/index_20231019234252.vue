<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getAnnualReportListAPI } from "@/api/annulReport/annulReport";
import {
  annualReportListItemType,
  annualReportListResult,
} from "@/api/types/annualReport/index";
import { Response } from "@/utils/http/types";
import swpuLogo from "@/assets/logo_D.png";
const themeVars = reactive({
  navBarTextColor: "#e1562a",
  navBarIconColor: "#e1562a",
});
const router = useRouter();
const route = useRoute();
const loading = ref(false);
const finished = ref(true);
const annulReportList = ref<annualReportListItemType[]>([
  {
    id: 1,
    reportBatchName: "2023学年年度报告",
    start: "2023-09-01T00:00:00.000+00:00",
    end: "2024-01-17T00:00:00.000+00:00",
  },
] as annualReportListItemType[]);
function onClickLeft() {
  router.back();
}
function openAnnulReport(id) {
  router.push({ path: "/reportPage", query: { reportId: id } });
}
function loadList() {
  loading.value = true;
  getAnnualReportListAPI({ page: 1, pageSize: 10 })
    .then((res: Response<annualReportListResult>) => {
      const { list } = res.data;
      annulReportList.value = list;
    })
    .finally(() => {
      loading.value = false;
      finished.value = false;
    });
}
</script>

<template>
  <div>
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
        <template #title><span style="color: #e1562a">年度报告</span></template>
      </van-nav-bar>
      <div class="container">
        <van-list
          class="list"
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="loadList"
        >
          <div>
            <van-cell
              v-for="report in annulReportList"
              :key="report.id"
              @click="openAnnulReport(report.id)"
            >
              <div class="object">
                <div class="seat">
                  <van-image
                    width="80%"
                    height="80%"
                    fit="contain"
                    :lazy-load="true"
                    :src="swpuLogo"
                  />
                </div>
                <div class="ObjInfo">
                  <div class="name">
                    {{ report.reportBatchName }}
                  </div>
                  <div>
                    {{ report.start.toString().substring(0, 10) }} ~
                    {{ report.end.toString().substring(0, 10) }}
                  </div>
                </div>
              </div>
            </van-cell>
          </div>
        </van-list>
      </div>
    </van-config-provider>
  </div>
</template>

<style scoped lang="less">
@objInfoWidth: 430px;

.container {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  .list {
    overflow-y: auto;
    padding: 20px 20px 50px;
    max-height: 1400px;

    .object {
      width: 660px;
      height: 200px;
      border-radius: 10px;
      border: 1px solid #cdcdcd;
      overflow: hidden;
      display: flex;
      flex-direction: row;
      margin-top: 20px;
      padding-right: 30px;

      .seat {
        height: 100%;
        width: calc(690px - @objInfoWidth);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .ObjInfo {
        width: @objInfoWidth;
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: 100%;

        .name {
          font-family: Gen Jyuu Gothic;
          font-size: 37px;
          font-weight: 300;
          line-height: 26px;
          letter-spacing: 3px;
          text-align: left;
          margin-bottom: 40px;
        }

        :deep(.van-progress) {
          height: 12px;
        }
      }
    }
  }
}
</style>
