<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from "vue";
import { gsap } from "gsap";
import { annualReportKeyword } from "@/api/types/annualReport/index";

const props = defineProps<{
  keywordsObj: annualReportKeyword;
}>();
</script>

<template>
  <div class="mainBox">
    <div class="title">你的年度关键词是</div>
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
    font-size: 45px;
    margin-bottom: 40px;
  }
  .keywordName {
    font-size: 110px;
  }
  .description {
    max-width: 360px;
    height: fit-content;
    padding: 20px;
    color: aqua;
    border: 3px solid rgb(241, 179, 64);
    border-radius: 15px;
    background-color: rgba(252, 252, 252, 0.281);
  }
}
</style>
