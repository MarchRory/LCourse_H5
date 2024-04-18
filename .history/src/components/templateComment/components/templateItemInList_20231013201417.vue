<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { commentTemplate } from "../../../api/types/comment";
const props = defineProps<{
  templateCommentText: commentTemplate;
  index: number;
}>();
const emits = defineEmits<{
  (e: "onChoose", template: commentTemplate): void;
}>();
const isReadMore = ref(false);
const templateItem = ref();
</script>

<template>
  <div>
    <div class="header">
      <span class="index">{{ props.index + 1 }}</span>
      <div class="leaf">
        <span class="chooseBtn">选择</span>
        <svg
          t="1697166617858"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="995"
          width="45"
          height="45"
        >
          <path
            d="M252.71931534 137.14393961c103.27220081-2.61518753 217.534267 9.89409639 309.05868069 27.92333876 121.7769318 23.97463794 235.60998566 74.63562911 306.53465828 160.49886789 95.23358266 115.11651568 10.36958503 384.55054688 109.12285622 464.4666025C809.89726562 654.45770854 681.74592591 501.66676182 475.24800064 392.97291793c198.0785587 99.13401958 354.86647011 311.71855702 465.36931589 473.17197731-212.586325-66.50227074-529.92136819-119.78023699-665.30335286-273.75990532-100.94123393-114.78403116-91.6173664-268.86201478-221.24522346-375.03719891-68.83145008-56.41690637 43.47861008-63.88529565 101.8457349-72.44766633 30.30435706-4.47245332 62.98436979-6.94642434 96.80484023-7.75618507z"
            fill="#ff6a00"
            p-id="996"
          ></path>
        </svg>
      </div>
    </div>
    <div class="templateCard">
      <div
        ref="templateItem"
        class="templateItem"
        :class="[isReadMore ? 'expand' : 'retract']"
      >
        <div
          style="display: inline"
          v-for="(item, index) in props.templateCommentText.templateText"
          :key="index"
        >
          <span
            v-if="(item as string).includes('${')"
            class="selectVocabularyArea"
            >{{ item }}</span
          >
          <span style="display: inline" v-else>
            {{ item }}
          </span>
        </div>
      </div>
      <div class="readmore" @click="isReadMore = !isReadMore">
        <div>
          <van-icon
            :style="{
              transform: isReadMore ? 'rotate(180deg)' : 'rotate(0deg)',
            }"
            name="arrow-down"
            size="20"
          />
          {{ isReadMore ? "收起" : "展开" }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header {
  position: absolute;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .index {
    position: relative;
    left: 20px;
    top: 20px;
    width: 35px;
    height: 35px;
    padding: 10px;
    color: white;
    /* color: rgb(235, 148, 61); */
    font-weight: bold;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    /*     border: 5px solid rgb(235, 148, 61); */
    background-color: rgb(235, 148, 61);
  }
  .leaf {
    position: absolute;
    right: -20px;
    top: -25px;
    .chooseBtn {
      position: relative;
      left: 20px;
      bottom: 6px;
      font-family: sans-serif;
      font-weight: bold;
      font-size: 1rem;
      color: rgb(235, 148, 61);
    }
  }
}
.templateCard {
  border: 5px solid rgb(235, 148, 61);
  border-radius: 15px;
  overflow: hidden;
  .templateItem {
    text-indent: 2rem;
    width: 90%;
    padding: 60px 20px 30px 20px;
    font-size: 1rem;
    line-height: 1.6rem;
    text-align: left;
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    background: #ffffff;
    .selectVocabularyArea {
      display: inline-block;
      border-bottom: 4px dashed rgb(240, 149, 45);
      padding-bottom: 5px;
      width: 60px;
      height: 1rem;
      margin: 0 10px;
      transform: translate(0, 6px);
    }
  }
  .readmore {
    width: 100%;
    color: rgb(218, 100, 32);
    display: flex;
    justify-content: center;
  }
}

.expand {
  height: auto;
  -webkit-line-clamp: "";
}
.retract {
  height: 12rem;
  -webkit-line-clamp: calc(12 / (1 + 0.6));
}
</style>
