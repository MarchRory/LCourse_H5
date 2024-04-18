<script setup lang="ts">
import { coursesItem } from "@/api/types/courses";
import { gsap } from "gsap";
import { onMounted } from "vue";
import { ref, watch, defineAsyncComponent } from "vue";
const Cuboid = defineAsyncComponent(() => import("../card/cuboid.vue"));
const props = defineProps<{
  maxCourse: coursesItem[];
}>();
const tl = gsap.timeline();
const cuboidColor = [
  { top: "#78b4f1", front: "#6397cc", aside: "#7dbdff" },
  { top: "#5e75e7", front: "#4b5fbf", aside: "#6580ff" },
  { top: "#2dcfcf", front: "#26c4c4", aside: "#2de2e2" },
  { top: "#8540df", front: "#7b38d1", aside: "#8c41ec" },
  { top: "#9add99", front: "#8ac689", aside: "#a2e7a1" },
  { top: "#ef9453", front: "#e18b4d", aside: "#ff9e58" },
  { top: "#a45923", front: "#85491d", aside: "#c26b2a" },
];
const booksVisible = ref(false);
const animationConfig = {
  headerDuration: 0.6,
  booksDuration: cuboidColor.length * 0.2,
  booksStagger: 0.07,
};
function initBooksAnimation() {
  setTimeout(() => {
    booksVisible.value = true;
  }, animationConfig.headerDuration * 2);
  tl.to(".header", {
    yPercent: 10,
    opacity: 1,
    duration: animationConfig.headerDuration,
  }).to(".cuboid_item", {
    stagger: animationConfig.booksStagger,
    duration: animationConfig.booksDuration,
    keyframes: {
      "0%": {
        xPercent: 0,
        yPercent: 20,
        rotateX: 50,
        rotateY: 50,
        rotateZ: 120,
      },
      "100%": {
        xPercent: 150,
        yPercent: 0,
        rotateX: -30,
        rotateY: 0,
        rotateZ: 0,
      },
    },
  });
}
onMounted(() => {
  if (props.maxCourse) {
    setTimeout(() => {
      initBooksAnimation();
    }, 800);
  }
});
function booksLeave(el, done) {}
/* watch(
  () => booksVisible.value,
  (newVal) => {
    if (newVal) {

    }
  }
); */
</script>
<template>
  <div class="mainBox">
    <header class="header">
      <div>你的</div>
      <div>年度课程</div>
    </header>
    <div class="main">
      <div class="leftSide">
        <div v-for="(item, index) in cuboidColor" :key="index">
          <Cuboid
            class="cuboid_item"
            :style="{ zIndex: cuboidColor.length + 1 - index }"
            :top-color="item.top"
            :aside-color="item.aside"
            :front-color="item.front"
          />
        </div>
        <div></div>
      </div>
      <div class="rightSide"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.mainBox {
  position: absolute;
  width: 100%;
  height: 90%;
  header {
    width: 85%;
    height: 13%;
    color: #60381b;
    margin: 0 auto;
    text-align: left;
    font-size: 60px;
    font-weight: 900;
  }
  .main {
    width: 94%;
    margin-top: 40px;
    height: 80%;
    display: flex;
    .leftSide {
      width: 40%;
      height: 100%;
      position: relative;
      top: 20%;
      left: -8%;
      .cuboid_item {
        position: relative;
        transform: translateX(-150%) translateY(20%);
      }
    }
    .rightSide {
      width: 60%;
      height: 100%;
      background-color: orange;
    }
  }
}
</style>
