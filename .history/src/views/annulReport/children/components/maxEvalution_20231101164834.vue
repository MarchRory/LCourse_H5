<script setup lang="ts">
import { coursesItem, evalutionType } from "@/api/types/courses";
import { ref } from "vue";
const props = defineProps<{
  maxEvalution: evalutionType;
  maxEvaluateCourse: coursesItem;
}>();
</script>

<template>
  <div class="mainBox">
    <header>
      <div>年度</div>
      <div>教师评语</div>
    </header>
    <div class="main">
      <div class="coursePreview">
        <div class="photoFrame">
          <div class="imgBox">
            <img :src="props.maxEvaluateCourse.cover" alt="课程封面" />
          </div>
        </div>
        <div class="title courseTextAnimation">
          {{ props.maxEvaluateCourse.title }}
        </div>
        <div class="location courseTextAnimation">
          {{ props.maxEvaluateCourse.courseLocation }}
        </div>
      </div>
      <div class="evalute">
        <span class="guide">教师评语: </span>
        <article v-html="props.maxEvalution.evaluate"></article>
      </div>
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
    background-color: aqua;
  }
  .main {
    width: 100%;
    height: 87%;
    background-color: #db9b6c;
    .coursePreview {
      width: 80%;
      height: 40%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-bottom: 60px;
      .photoFrame {
        margin-top: 30px;
        height: 100%;
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
        margin-bottom: 20px;
        .imgBox {
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .courseTextAnimation {
        font-weight: bolder;
      }
      .title {
        color: #194f6a;
        font-size: 45px;
      }
      .location {
        color: #678ea2;
        font-size: 35px;
      }
    }
    .evalute {
      margin: 0 auto;
      width: 80%;
      text-align: left;
      word-wrap: normal;
      .guide {
        font-size: 38px;
        font-weight: bolder;
        color: #db9b6c;
        display: inline;
      }
      article {
        text-indent: 2em;
      }
    }
  }
}
</style>
