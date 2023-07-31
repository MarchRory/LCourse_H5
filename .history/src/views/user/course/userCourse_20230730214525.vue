<template>
  <van-sticky>
    <van-nav-bar title="我的课程" left-text="返回" left-arrow @click-left="onClickLeft" />
  </van-sticky>
  <div class="container">
    <div class="course-list">
      <course-list category="" user-type="1" />
    </div>
  </div>
</template>

<script setup>
import CourseList from "@/components/courseList/courseList.vue";
import { useRouter } from 'vue-router'
const router = useRouter();

const onClickLeft = () => {
  router.back();
};
</script>

<style scoped>
.course-list {
  overflow-y: auto;
}

.container {
  padding: 20px;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>
