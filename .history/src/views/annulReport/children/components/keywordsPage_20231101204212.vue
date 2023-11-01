<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from "vue";
import { gsap } from "gsap";
import { annualReportKeyword } from "@/api/types/annualReport/index";
const tl = gsap.timeline();
const props = defineProps<{
  keywordsObj: annualReportKeyword;
}>();
const animationConfig = {};
</script>

<template>
  <div class="mainBox">
    <div class="title">年度<br />关键词</div>
    <div class="keywordName">
      {{ keywordsObj.keyword }}
    </div>
    <div class="description">"&nbsp;{{ keywordsObj.unscramble }}&nbsp;”</div>
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
    position: absolute;
    top: 20px;
    font-size: 50px;
    margin-bottom: 40px;
    color: #60381b;
    margin: 0 auto;
    text-align: left;
    font-weight: 900;
  }
  .keywordName {
    font-size: 135px;
  }
  .description {
    max-width: 360px;
    height: fit-content;
    padding: 20px;
    color: rgb(180, 106, 10);
    border-radius: 15px;
  }
}
</style>
