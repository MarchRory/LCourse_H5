<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { gsap } from "gsap";
import { coursesItem } from "@/api/types/courses";
const props = defineProps<{
  firstCourse: coursesItem;
}>();
</script>

<template>
  <div></div>
</template>

<style scoped lang="less"></style>
