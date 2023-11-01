<script setup lang="ts">
import { computed } from "vue";
import { gsap } from "gsap";
const props = defineProps<{
  courseTotal: number;
  monthDetails: Map<String, String>;
  courseTimeTotal: string;
}>();
function onContextEnter(el, done) {
  gsap.fromTo(
    el,
    {
      opacity: 0,
      yPercent: -10,
      delay: el.dataset.index * 0.8,
      duration: 0.3,
    },
    {
      opacity: 1,
      yPercent: 0,
      delay: el.dataset.index * 0.8,
      duration: 0.3,
    }
  );
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
        <br v-if="index == 7" />
      </div>
    </transition-group>
  </div>
</template>

<style scoped lang="less">
.container {
  width: 100vw;
  height: 100%;
  header {
    position: relative;
    bottom: 35%;
    font-size: 55px;
    font-weight: 900;
    color: rgb(23, 86, 145);
    .numberStyle {
      font-size: 80px;
    }
    div {
      span {
      }
    }
  }
}
</style>
