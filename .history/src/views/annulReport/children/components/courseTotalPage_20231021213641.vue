<script setup lang="ts">
import { computed } from "vue";
import { gsap } from "gsap";
const props = defineProps<{
  courseTotal: number;
  monthDetails: Map<String, String>;
  courseTimeTotal: string;
}>();
const words = ref([]);
function onContextEnter(el, done) {
  console.log(el);
  gsap.fromTo(
    el,
    {
      opacity: 0,
      y: -10,
      ease: "back.in",
      duration: 0.5,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
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
  return `今年你一共参加了${props.courseTotal}门劳动二课`;
});
onMounted(() => {
  headerWords.value.split("").forEach((item) => {
    words.value.push(item);
  });
});
</script>

<template>
  <div class="container">
    <transition-group
      :css="false"
      tag="header"
      @enter="onContextEnter"
      @leave="onContextLeave"
    >
      <div
        style="display: inline"
        v-for="(word, index) in headerWords.split('')"
        :key="index"
        :class="!Number.isNaN(parseInt(word)) ? 'numberStyle' : ''"
      >
        <br v-if="!Number.isNaN(parseInt(word))" />
        {{ word }}
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
  }
}
.numberStyle {
  font-size: 80px;
}
</style>
