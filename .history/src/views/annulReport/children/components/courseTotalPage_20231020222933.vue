<script setup lang="ts">
import { gsap, computed } from "gsap";
const props = defineProps<{
  courseTotal: number;
  monthDetails: Map<String, String>;
  courseTimeTotal: string;
}>();
function onContextEnter(el, done) {
  gsap.fromTo(el, {}, {});
}
function onContextLeave(el, done) {}
computed(() => {});
</script>

<template>
  <div class="container">
    <transition-group
      tag="header"
      :css="false"
      @enter="onContextEnter"
      @leave="onContextLeave"
    >
    </transition-group>
  </div>
</template>

<style scoped lang="less">
.container {
  width: 100vw;
  height: 100%;
}
</style>
