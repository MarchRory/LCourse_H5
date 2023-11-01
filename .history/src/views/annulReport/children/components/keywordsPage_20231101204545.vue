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
  width: 100%;
  height: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bolder;
  .title {
    width: 85%;
    height: 13%;
    font-size: 60px;
    margin-bottom: 40px;
    color: #60381b;
    margin: 0 auto;
    margin-top: 20px;
    text-align: left;
    font-weight: 900;
  }
  .keywordName {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 135px;
    margin-top: 13%;
    width: 100%;
    height: 50%;
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
