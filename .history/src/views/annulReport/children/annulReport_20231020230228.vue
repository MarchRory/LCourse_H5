<script setup lang="ts">
import { getAnnualReportDetailAPI } from "@/api/annulReport/annulReport";
import { annulReportItem } from "@/api/types/annualReport";
import { useRoute, useRouter } from "vue-router";
import { Response } from "@/utils/http/types";
import { AxiosRequestConfig } from "axios";
import { defineAsyncComponent } from "vue";
import gsap from "gsap";
const AnnulReportLoading = defineAsyncComponent(
  () => import("@/views/annulReport/children/components/loadingPage.vue")
);
const CoverPage = defineAsyncComponent(
  () => import("@/views/annulReport/children/components/coverPage.vue")
);
const CourseTotalPage = defineAsyncComponent(
  () => import("@/views/annulReport/children/components/courseTotalPage.vue")
);
const route = useRoute();
const router = useRouter();
const touchPosWatch = ref({
  isMove: false,
  startY: 0,
  endY: 0,
});
const isDownload = ref(true);
const annualReportInfo = ref<annulReportItem>({} as annulReportItem);
const progress = ref<number>(0);
const currentPage = ref(2);
function getAnnualReportInfo() {
  getAnnualReportDetailAPI(
    route.query.reportId as string,
    {
      onDownloadProgress: function (e) {
        isDownload.value = false;
        progress.value = Math.floor((e.loaded / (e.total as number)) * 100);
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
function handleTouchStart(e) {
  touchPosWatch.value.startY = e.touches[0].pageY;
}
function handleTouchEnd(e) {
  let directionY = touchPosWatch.value.startY - touchPosWatch.value.endY;
  if (touchPosWatch.value.isMove && directionY < 0) {
    // 向上滑，且不是最后一页
    if (currentPage.value > 1) {
      currentPage.value--;
      touchPosWatch.value.isMove = false;
    }
  } else if (touchPosWatch.value.isMove && directionY > 0) {
    // 向上滑
    if (currentPage.value < 9) {
      currentPage.value++;
      touchPosWatch.value.isMove = false;
    }
  }
}
function handleTouchMove(e) {
  touchPosWatch.value.isMove = true;
  e.preventDefault();
  touchPosWatch.value.endY = e.touches[0].pageY;
}
function onEnter(el, done) {
  gsap.fromTo(
    el,
    {
      opacity: 0,
      duration: 1.3,
      delay: 1.3,
    },
    {
      opacity: 1,
      onComplete: done,
    }
  );
}
function onLeave(el, done) {
  gsap.to(el, {
    opacity: 0,
    duration: 0.3,
    onComplete: done,
  });
}
getAnnualReportInfo();
watch(
  () => progress.value,
  (newVal) => {
    if (newVal >= 100) {
      currentPage.value = 1;
    }
  }
);
</script>

<template>
  <div
    class="container"
    style="width: 100vw; height: 100vh; z-index: 10"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div id="backBtn">
      <van-icon name="arrow-left" size="18" @click="goBack" />
    </div>
    <Transition :css="false" @enter="onEnter" @leave="onLeave">
      <AnnulReportLoading :progress="progress" v-if="currentPage == 0" />
      <CoverPage
        v-else-if="currentPage == 1"
        @next-page="currentPage = 2"
        :batch-name="annualReportInfo.year"
      />
      <CourseTotalPage
        v-else-if="currentPage == 2"
        :course-total="annualReportInfo.courseTotal"
        :month-details="annualReportInfo.monthDetails"
        :course-time-total="annualReportInfo.courseTimeTotal"
      />
    </Transition>
    <div id="toolTip">上划进入下一页</div>
  </div>
</template>

<style scoped lang="less">
.container {
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
}
#backBtn {
  position: fixed;
  z-index: 20;
  left: 40px;
  top: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: rgba(189, 189, 189, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.24);
  color: white;
  font-weight: 800;
  backdrop-filter: blur(10px);
}
#toolTip {
  position: fixed;
  z-index: 999;
  left: 50%;
  transform: translate(-50%);
  font-size: 0.8rem;
  color: rgb(172, 171, 171);
  font-weight: bold;
  bottom: 60px;
  letter-spacing: 5px;
}
</style>
