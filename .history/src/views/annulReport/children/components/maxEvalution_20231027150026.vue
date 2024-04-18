<script setup lang="ts">
import { evalutionType } from "@/api/types/courses";
import { ref } from "vue";
const props = defineProps<{
  maxEvalution: evalutionType;
  maxEvaluateCourse: coursesItem;
}>();
</script>

<template>
  <div></div>
</template>

<style scoped lang="less"></style>
