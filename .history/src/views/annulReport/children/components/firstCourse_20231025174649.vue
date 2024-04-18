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
  textEnd.value = true;
  /*   setTimeout(() => {
    textEnd.value = true;
  }, 1000 * animationConfig.enterDuration);
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
  }); */
}
onMounted(() => {
  if (props.firstCourse) {
    setTimeout(() => {
      initAnimation();
    }, 800);
  }
});

watch(
  () => textEnd.value,
  (newVal) => {
    if (newVal) {
      tl.from(".courseCard", {
        scaleX: 1,
        transformOrigin: "0% 0%",
        duration: 3,
      }).to(".courseCard", {});
    }
  }
);
</script>

<template>
  <div class="mainBox">
    <div v-if="false" style="position: absolute">
      <div class="text">千里之行, 始于足下</div>
      <div class="text">这一年的故事, 从这里开始...</div>
    </div>

    <div v-show="textEnd" class="coursePage">
      <header>
        <div class="guideText">
          新的<br />
          <div>故事</div>
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
        <div class="part">
          <div class="">
            {{
              props.firstCourse.applicationStart
                .substring(0, 10)
                .replaceAll("-", ".")
            }}
          </div>
          <div class="text">故事进入下个篇章</div>
        </div>
        <div class="part">
          <div>与你同行</div>
          <div class="text">
            {{ props.firstCourse.signUpCount - 1 }}人与你相聚
          </div>
          <div class="text">{{ props.firstCourse.courseLocation }}</div>
        </div>
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
      font-weight: bolder;
      font-weight: 900;
      color: rgb(13, 31, 41);
    }
    .courseTitle {
      font-size: 30px;
      font-weight: bolder;
      color: rgb(0, 4, 7);
      text-align: right;
      .title {
        margin-bottom: 10px;
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
    transform: perspective(500px);
    .photoFrame {
      height: 85%;
      width: fit-content;
      border-top: 10px solid white;
      border-bottom: 10px solid rgb(241, 241, 241);
      border-right: 10px solid white;
      border-left: 20px solid rgb(241, 241, 241);
      background: linear-gradient(to right, rgb(241, 241, 241), white);
      box-shadow:
        0px 0.1px 2.1px -6px rgba(0, 0, 0, 0.085),
        0px 0.4px 6.9px -6px rgba(0, 0, 0, 0.125),
        0px 2px 31px -6px rgba(0, 0, 0, 0.21);
      .imgBox {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  footer {
    width: 100%;
    height: 40%;
    padding-top: 60px;
    position: absolute;
    color: #60381b;
    .part {
      margin-bottom: 50px;
      .text {
        font-size: 40px;
        font-weight: bolder;
      }
    }
  }
}
</style>
