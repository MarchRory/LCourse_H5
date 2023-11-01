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
      y: -10,
      stagger: 0.2,
      ease: "back.in",
      duration: 0.4,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      onComplete: done,
    }
  );
}
function onContextLeave(el, done) {
  gsap.to(el, {
    opacity: 0,
    yPercent: -10,
    stagger: 0.3,
    onComplete: done,
  });
}
watch(
  () => props.courseTotal,
  () => {}
);
const headerWords = computed(() => {
  return ["今年你一共参加了", props.courseTotal, "门劳动二课"];
});
</script>

<template>
  <div class="container">
    <TransitionGroup
      :css="false"
      tag="header"
      @enter="onContextEnter"
      @leave="onContextLeave"
    >
      <span
        style="display: inline-block"
        v-for="(word, index) in headerWords"
        :key="index"
        :class="typeof word == 'number' ? 'numberStyle' : ''"
      >
        {{ word }}
        <br v-if="typeof word != 'number'" />
      </span>
    </TransitionGroup>
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
  }
}
.numberStyle {
  font-size: 80px;
}
</style>
