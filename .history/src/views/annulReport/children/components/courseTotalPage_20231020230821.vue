<script setup lang="ts">
import { computed } from "vue";
import { gsap } from "gsap";
const props = defineProps<{
  courseTotal: number;
  monthDetails: Map<String, String>;
  courseTimeTotal: string;
}>();
function onContextEnter(el, done) {
  gsap.fromTo(el, {}, {});
}
function onContextLeave(el, done) {
  gsap.to(el, {});
}
watch(
  () => props.courseTotal,
  () => {}
);
const headerWords = computed(() => {
  return `今年你一共参加了${props.courseTotal}门劳动二课`;
});
</script>

<template>
  <div class="container">
    <transition-group
      tag="header"
      :css="false"
      @enter="onContextEnter"
      @leave="onContextLeave"
    >
      <div style="display: inline" v-for="(word, index) in headerWords">
        <span v-if="typeof word == 'number'" class="numberStyle">
          {{ word }}
        </span>
        <span v-else>{{ word }}</span>
      </div>
    </transition-group>
  </div>
</template>

<style scoped lang="less">
.container {
  width: 100vw;
  height: 100%;
  position: relative;
  position: fixed;
  header {
    div {
      span {
      }
    }
  }
}
</style>
