<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/all";
import { coursesItem } from "@/api/types/courses";
gsap.registerPlugin(TextPlugin);
const props = defineProps<{
  firstCourse: coursesItem;
}>();
const textEnd = ref(false);
const tl = gsap.timeline();
const animationConfig = {
  enterDuration: 6,
  leaveDuration: 2,
  stagger: 0.8,
};
function initAnimation() {
  setTimeout(() => {
    textEnd.value = true;
  }, animationConfig.enterDuration);
  tl.to(".text", {
    keyframes: {
      "0%": {
        scale: 0.3,
        opacity: 0.3,
        color: "transparent",
        textShadow: "0px 0px 25px #000000",
      },
      "40%": {
        scale: 0.7,
        opacity: 0.8,
        color: "black",
        textShadow: "0 0 0px #000000",
      },
      "70%": {
        scale: 0.9,
        textShadow: "0 0 0px #000000",
        opacity: 0.3,
        ease: "linear",
      },
      "100%": {
        scale: 1.2,
        textShadow: "0px 0px 50px #000000",
        color: "transparent",
        ease: "linear",
        opacity: 0,
      },
    },
    ease: "none",
    duration: animationConfig.enterDuration,
  });
}
onMounted(() => {
  if (props.firstCourse) {
    setTimeout(() => {
      initAnimation();
    }, 800);
  }
});
</script>

<template>
  <div class="mainBox">
    <div style="position: absolute">
      <div class="text">千里之行, 始于足下</div>
      <div class="text">这一年的故事, 从这里开始...</div>
    </div>

    <div v-if="textEnd" class="coursePage">
      <header>
        <div class="guideText">
          新的<br />
          <div>故事开始</div>
        </div>
        <div class="courseTitle">
          <div class="title">{{ props.firstCourse.title }}</div>
          <div>{{ props.firstCourse.organizer }}</div>
          <div></div>
        </div>
      </header>
      <div class="courseCard">
        <div class="photoFrame">
          <div class="imgBox">
            <img :src="props.firstCourse.cover" alt="firstCourseCover" />
          </div>
        </div>
      </div>
      <footer>
        <div></div>
        <div></div>
        <div></div>
      </footer>
    </div>
  </div>
</template>

<style scoped lang="less">
.mainBox {
  width: 85%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text {
  font-weight: bolder;
  font-family: sans-serif;
}
.coursePage {
  position: absolute;
  width: 86%;
  height: 90%;
  header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    height: 16%;
    .guideText {
      text-align: left;
      font-size: 68px;
      font-weight: 900;
      color: rgb(27, 139, 199);
    }
    .courseTitle {
      font-size: 28px;
      font-weight: bold;
      color: rgb(0, 4, 7);
      text-align: right;
      .title {
        font-size: 40px;
      }
    }
  }
  .courseCard {
    margin: 0 auto;
    width: 80%;
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    .photoFrame {
      height: 85%;
      width: fit-content;
      padding: 10px 5px 10px 15px;
      border-radius: 20px;
      background-color: antiquewhite;
      .imgBox {
        width: 94%;
        margin-left: 4%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 20px;
        }
      }
    }
  }
  footer {
    width: 100%;
    height: 40%;
    position: absolute;
    background-color: chocolate;
  }
}
</style>
