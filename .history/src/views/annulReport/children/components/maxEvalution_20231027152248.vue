<script setup lang="ts">
import { coursesItem, evalutionType } from "@/api/types/courses";
import { ref } from "vue";
const props = defineProps<{
  maxEvalution: evalutionType;
  maxEvaluateCourse: coursesItem;
}>();
</script>

<template>
  <div class="mainBox"></div>
</template>

<style scoped lang="less">
.mainBox {
  position: absolute;
  width: 100%;
  height: 90%;
}
</style>
