<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { gsap } from "gsap";
import { coursesItem } from "@/api/types/courses";
const props = defineProps<{
  firstCourse: coursesItem;
}>();
</script>

<template>
  <div>
    <span>始于足下</span>
    <div></div>
    这一年的故事, 从这里开始...
  </div>
</template>

<style scoped lang="less"></style>
