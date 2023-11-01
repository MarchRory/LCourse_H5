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
        <div>{{ props.maxEvaluateCourse.title }}</div>
        <div>{{ props.maxEvaluateCourse.courseLocation }}</div>
      </div>
      <div class="evalute"></div>
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
    width: 100%;
    height: 87%;
    .coursePreview {
      width: 80%;
      height: 40%;
      background-color: aqua;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background-color: aqua;
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
  }
}
</style>
