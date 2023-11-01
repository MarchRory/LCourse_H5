<script setup lang="ts">
import { coursesItem } from "@/api/types/courses";
import { gsap } from "gsap";
import { ref, watch } from "vue";
const props = defineProps<{
  maxCourse: coursesItem[];
}>();
const tl = gsap.timeline();
</script>
<template>
  <div class="mainBox"></div>
</template>

<style scoped lang="less">
.mainBox {
}
</style>
