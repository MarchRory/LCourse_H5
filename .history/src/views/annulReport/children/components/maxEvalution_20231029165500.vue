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
        <div class="imgBox">
          <img :src="props.maxEvaluateCourse.cover" alt="" />
        </div>
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
  }
}
</style>
