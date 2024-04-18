<script setup lang="ts">
import { coursesItem } from "@/api/types/courses";
import { gsap } from "gsap";
import { ref, watch } from "vue";
const props = defineProps<{
  maxCourse: coursesItem[];
}>();
const tl = gsap.timeline();
const cuboidColor = [
  "#78b4f1",
  "#5e75e7",
  "#2dcfcf",
  "#8540df",
  "#9add99",
  "#ef9453",
  "#81451a",
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
            <div class="cuboid-top" :style="{ backgroundColor: item }"></div>
            <div class="cuboid-front" :style="{ backgroundColor: item }"></div>
            <div class="cuboid-aside" :style="{ backgroundColor: item }"></div>
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
        .cuboid-top {
          height: 200px;
          transform: rotateX(80deg) translateZ(36px);
        }
        .cuboid-front {
          height: 30px;
          transform: rotateY(0deg) translateZ(-30px) translateX(78px)
            translateY(-30px);
        }
        .cuboid-aside {
          height: 20px;
          transform: rotateY(-90deg) translateZ(36px);
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
