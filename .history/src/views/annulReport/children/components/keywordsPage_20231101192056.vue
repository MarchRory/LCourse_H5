<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { annualReportKeyword } from "@/api/types/annualReport/index";

const props = defineProps<{
  keywordsObj: annualReportKeyword;
}>();
</script>

<template>
  <div class="mainBox">
    <div class="title">你的年度关键词是</div>
    <div class="keywordName">{{ keywordsObj.keyword }}</div>
    <div class="description">{{ keywordsObj.unscramble }}</div>
  </div>
</template>

<style scoped lang="less">
.mainBox {
  position: absolute;
  width: fit-content;
  height: fit-content;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  font-weight: bolder;
  .title {
    font-size: 45px;
    margin-bottom: 60px;
  }
  .keywordName {
  }
}
</style>
