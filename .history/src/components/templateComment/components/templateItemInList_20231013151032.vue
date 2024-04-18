<script lang="ts" scoped>
import { defineProps, defineEmits } from "vue";
import { commentTemplate } from "../../../api/types/comment";
const props = defineProps<{
  templateComment: commentTemplate;
}>();
const emits = defineEmits<{
  (e: "onChoose", template: commentTemplate): void;
}>();
const isReadMore = ref(false);
</script>

<template>
  <div>
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
    <div class="templateCard">
      <article
        class="templateItem"
        :style="{ height: isReadMore ? 'auto' : '12rem' }"
      >
        <div
          style="display: inline"
          v-for="(item, index) in templateComment.templateText"
          :key="index"
        >
          <span
            v-if="(item as string).includes('${')"
            class="selectVocabularyArea"
          ></span>
          <span style="display: inline" v-else>
            {{ item }}
          </span>
        </div>
      </article>
      <div class="readmore" @click="isReadMore = !isReadMore">
        <van-icon
          :style="{
            transform: isReadMore ? 'rotate(180deg)' : 'rotate(0deg)',
          }"
          style="transition: transform 0.3s ease-in-out"
          name="arrow-down"
          size="20"
        />
        {{ isReadMore ? "收起" : "展开" }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.templateCard {
  border: 5px solid rgb(235, 148, 61);
  border-radius: 15px;
  overflow: hidden;
  .templateItem {
    width: 90%;
    padding: 60px 20px 30px 20px;
    height: 12rem;
    font-size: 1rem;
    line-height: 1.6rem;
    text-align: left;
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: calc(12 / (1 + 0.6));
    -webkit-box-orient: vertical;
    background: #ffffff;
    transition: all 0.3s ease-in-out;
  }
  .readmore {
    width: fit-content;
    margin: 0 auto;
    color: rgb(218, 100, 32);
  }
}

.leaf {
  position: absolute;
  right: -20px;
  top: -25px;
}
.chooseBtn {
  position: relative;
  left: 10px;
  bottom: 6px;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 1rem;
  color: rgb(235, 148, 61);
}
</style>
