<script setup lang="ts">
import { computed, onMounted, defineAsyncComponent } from "vue";
import { gsap } from "gsap";
import { getKeyByValueInMap } from "@/utils/dataUtil/map";
const props = defineProps<{
  courseTotal: number;
  monthDetails: Map<String, String>;
  courseTimeTotal: string;
}>();
const MonthScoreChart = defineAsyncComponent(
  () => import("../charts/monthScore.vue")
);
const tl = gsap.timeline();
function onContextEnter(el, done) {
  console.log(el);
  gsap.to(el, {
    autoAlpha: 1,
    opacity: 1,
    scale: 1,
    transformOrigin: "center center",
    stagger: 0.6,
  });
}
function onContextLeave(el, done) {
  console.log(el);
  gsap.to(el, {
    opacity: 0,
    yPercent: -10,
    onComplete: done,
  });
}
const chartLoad = ref(false);
const maxMonth = ref<String>();
function initHeaderAnimation() {
  setTimeout(() => {
    chartLoad.value = true;
  }, 3500);
  tl.from(".text", {
    duration: 3,
    scale: 0,
    opacity: 0,
    stagger: 0.5,
  }).to(".text", {
    opacity: 1,
    scale: 1,
  });
}
function getMaxMonth() {
  let longestTime = Math.max(
    ...Array.from(props.monthDetails.values()).map(Number)
  );
  maxMonth.value = getKeyByValueInMap(props.monthDetails, longestTime);
}
watch(
  () => props.courseTotal,
  () => {}
);
onMounted(() => {
  if (props.courseTimeTotal) {
    initHeaderAnimation();
    getMaxMonth();
  }
});
</script>

<template>
  <div class="container">
    <header>
      <div class="text">今年你一共参加</div>
      <div class="text">
        <span class="numberStyle">{{ props.courseTotal }}</span
        >门劳动二课
      </div>
      <div class="text totalTime">{{ props.courseTimeTotal }}</div>
    </header>
    <MonthScoreChart v-if="chartLoad" class="chartBox" :data="monthDetails" />
    <footer>
      <span>挥洒汗水最多的时候是</span>
      <div>
        <span>{{ maxMonth }}</span> <span>月</span>
      </div>
      <span>还记得那段日子吗</span>
    </footer>
  </div>
</template>

<style scoped lang="less">
.container {
  width: 100vw;
  height: 100%;
  header {
    position: relative;
    bottom: 35%;
    font-size: 55px;
    font-weight: 900;
    color: rgb(23, 86, 145);
    .totalTime {
      font-size: 35px;
      padding-top: 5px;
    }
  }
  .chartBox {
    position: absolute;
    width: 650px;
    height: 600px;
  }
  footer {
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    bottom: 134%;
    color: skyblue;
    font-weight: bolder;
    font-size: 40px;
  }
}
.numberStyle {
  font-size: 100px;
}
</style>
