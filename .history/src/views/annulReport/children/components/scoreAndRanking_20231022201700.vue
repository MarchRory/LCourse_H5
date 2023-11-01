<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { scoreDetailType } from "@/api/types/annualReport/index";
const props = defineProps<{
  scoreDetails: scoreDetailType;
  ranking: number;
}>();
const maxScoreCategory = computed(() => {
  let maxScore = Math.max(...Object.values(props.ranking).map(Number));
  return Object.keys(props.scoreDetails).find(
    (key) => props.scoreDetails[key] == maxScore
  );
});
</script>

<template>
  <div></div>
</template>

<style lang="less" scoped></style>
