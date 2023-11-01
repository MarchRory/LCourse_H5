<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAnnualReportListAPI } from "@/api/annulReport/annulReport";
import {
  annualReportListItemType,
  annualReportListResultModel,
  annulReportItem,
} from "@/api/types/annualReport/index";
import swpuLogo from "@/assets/logo_D.png";
const themeVars = reactive({
  navBarTextColor: "#e1562a",
  navBarIconColor: "#e1562a",
});
const router = useRouter();
const loading = ref(false);
const finished = ref(false);
const annulReportList = ref<annualReportListItemType[]>([
  {
    id: 1,
    uid: 1,
    year: "2023年年度报告",
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
  getAnnualReportListAPI()
    .then((res: annualReportListResultModel) => {
      const { list } = res;
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
        <template #title><span style="color: #e1562a">历史目标</span></template>
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
                    {{ obj.objectivesName }}
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
