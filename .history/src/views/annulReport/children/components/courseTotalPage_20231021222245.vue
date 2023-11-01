<script setup lang="ts">
import { computed, onMounted } from "vue";
import { gsap } from "gsap";
import { init } from "echarts";
const props = defineProps<{
  courseTotal: number;
  monthDetails: Map<String, String>;
  courseTimeTotal: string;
}>();
function onContextEnter(el, done) {
  console.log(el);
  gsap.fromTo(
    el,
    {
      opacity: 0,
      yPercent: -10,
      ease: "back.in",
      duration: 0.5,
    },
    {
      opacity: 1,
      yPercent: 0,
      duration: 0.5,
      onComplete: done,
    }
  );
}
function onContextLeave(el, done) {
  console.log(el);
  gsap.to(el, {
    opacity: 0,
    yPercent: -10,
    onComplete: done,
  });
}
function initAnimation() {
  gsap.to(".text", {
    autoAlpha: 1,
    opacity: 1,
    scale: 1,
    transformOrigin: "center center",
    stagger: 0.6,
  });
}
watch(
  () => props.courseTotal,
  () => {}
);
const headerWords = computed(() => {
  return `今年你一共参加了${props.courseTotal}门劳动二课`;
});
onMounted(() => {
  initAnimation();
});
</script>

<template>
  <div class="container">
    <!--     <transition-group :css="false" tag="header">
      <div
        class="headerWordItem"
        style="display: inline"
        v-for="(word, index) in headerWords.split('')"
        :key="index"
        :class="!Number.isNaN(parseInt(word)) ? 'numberStyle' : ''"
      >
        <br v-if="!Number.isNaN(parseInt(word))" />
        {{ word }}
      </div>
    </transition-group> -->
    <transition appear :css="false">
      <header>
        <p class="text">今年你一共参加了</p>
        <p class="text">
          <span class="numberStyle">{{ props.courseTotal }}</span
          >门劳动二课
        </p>
      </header>
    </transition>
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
    opacity: 0;
    color: rgb(23, 86, 145);
  }
}
.numberStyle {
  font-size: 80px;
}
</style>
