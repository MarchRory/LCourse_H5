<script setup lang="ts">
import { coursesItem } from "@/api/types/courses";
import { gsap } from "gsap";
import { ref, watch } from "vue";
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
</script>
<template>
  <div class="mainBox">
    <header>
      <div>你的</div>
      <div>年度课程</div>
    </header>
    <div class="main">
      <div class="leftSide">
        <transition-group>
          <div
            class="cuboid"
            v-for="(item, index) in cuboidColor"
            :key="index"
            :style="{ zIndex: cuboidColor.length + 1 - index }"
          >
            <div
              class="cuboid-top"
              :style="{ backgroundColor: item.top }"
            ></div>
            <div
              class="cuboid-front"
              :style="{ backgroundColor: item.front }"
            ></div>
            <div
              class="cuboid-aside"
              :style="{ backgroundColor: item.aside }"
            ></div>
          </div>
        </transition-group>
        <div></div>
      </div>
      <div class="rightSide"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.mainBox {
  width: 100%;
  height: 85%;
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
      .cuboid {
        transform-style: preserve-3d;
        transform: rotateX(-30deg) rotateY(30deg);
        position: relative;
        top: -50%;
        .cuboid-top {
          height: 200px;
          transform: rotateX(80deg) translateZ(36px);
        }
        .cuboid-front {
          height: 30px;
          width: 98%;
          transform: rotateY(0deg) translateZ(-30px) translateX(83px)
            translateY(-30px);
        }
        .cuboid-aside {
          height: 29px;
          transform: rotateY(-97deg) translateZ(22px) translateX(-254px);
        }
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
