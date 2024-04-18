<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { gsap } from "gsap";
import { coursesItem } from "@/api/types/courses";
const props = defineProps<{
  firstCourse: coursesItem;
}>();
console.log(props.firstCourse);
</script>

<template>
  <div class="mainBox">
    <span>始于足下</span>
    <div></div>
    <span> 这一年的故事, 从这里开始...</span>
  </div>
</template>

<style scoped lang="less">
.mainBox {
  width: 95%;
  height: 90%;
  text-align: left;
}
</style>
