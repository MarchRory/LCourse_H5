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
    <span class="text">千里之行, 始于足下</span>
    <br /><br />
    <span class="text">这一年的故事, 从这里开始...</span>
  </div>
</template>

<style scoped lang="less">
.mainBox {
  width: 85%;
}
.text {
  font-size: 18px;
  font-weight: bolder;
  font-family: sans-serif;
}
</style>
