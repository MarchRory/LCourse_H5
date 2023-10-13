<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";
import {
  commentTemplate,
  commentTemplateResultModel,
  templateAndVocabularyListParamsType,
} from "../../api/types/comment";
import { getCommentTemplateAPI } from "@/api/courses/courses";
import { Response } from "@/utils/http/types";
import { showFailToast } from "vant";

const props = defineProps<{
  level: number;
}>();
const emits = defineEmits<{
  (e: "onChange", resText: string): void;
}>();
const selfCommentTemplateList = ref<commentTemplate[]>([] as commentTemplate[]);
const selfCommentTemplateTotal = ref<number>(0);
const commentTemplateListParams = ref<templateAndVocabularyListParamsType>({
  page: 1,
  pageSize: 10,
  level: 0,
  type: 0,
  key: "",
});
const templateLoading = ref(false);
const templateListFinished = ref(false);
const isOpenTemplateList = ref(false);
const isReadMore = ref(false);
const templateTextCopy = ref<string[]>([]);
const vocabulary = ref<any>();

const loadSelfCommentTemplateList = () => {
  if (templateListFinished.value) {
    templateLoading.value = false;
    return;
  }
  templateLoading.value = true;
  getCommentTemplateAPI(commentTemplateListParams.value)
    .then((res: Response<commentTemplateResultModel>) => {
      const { list, total } = res.data;
      list.forEach((item: commentTemplate) => {
        item.templateText = (item.templateText as string).split("&");
        selfCommentTemplateList.value.push(item);
        selfCommentTemplateList.value.push(item);
      });
      selfCommentTemplateTotal.value = total;
      templateListFinished.value =
        selfCommentTemplateList.value.length >= selfCommentTemplateTotal.value;
    })
    .finally(() => {
      templateLoading.value = false;
    });
};

const beginComment = async () => {
  if (!props.level) {
    showFailToast("先打分再进行操作吧");
    return;
  }
  if (!selfCommentTemplateList.value.length) {
    loadSelfCommentTemplateList();
  }
  isOpenTemplateList.value = true;
};
const openTemplateSwitch = () => {
  isOpenTemplateList.value = true;
};

watch(
  () => props.level,
  (newVal: number) => {
    commentTemplateListParams.value.level = newVal * 2;
    selfCommentTemplateList.value = [];
    selfCommentTemplateTotal.value = 0;
    templateLoading.value = false;
    templateListFinished.value = false;
  }
);
</script>

<template>
  <div>
    <ul @click="beginComment">
      <li><van-icon name="replay" size="20" /></li>
      <li style="margin-left: 5px">选择</li>
    </ul>
    <div class="commenArea">
      <span v-if="!selfCommentTemplateTotal" class="notice"
        >打分后点击选择使用自我评价文本模板</span
      >
      <div v-else>
        <article></article>
      </div>
    </div>
    <van-popup
      v-model:show="isOpenTemplateList"
      closeable
      safe-area-inset-top
      position="right"
      :style="{ width: '75%', height: '100%' }"
    >
      <span class="popupTitle">自我评价模板</span>
      <div class="templateListBox">
        <van-list
          v-model:loading="templateLoading"
          :finished="templateListFinished"
          finished-text="没有更多模板了"
          @load="loadSelfCommentTemplateList"
        >
          <van-cell
            v-for="(template, index) in selfCommentTemplateList"
            :key="index"
          >
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
                  v-for="(item, index) in template.templateText"
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
              <div class="readmore">
                <van-icon name="arrow-down" size="20" />
                {{ isReadMore ? "收起" : "展开" }}
              </div>
            </div>
          </van-cell>
        </van-list>
      </div>
    </van-popup>
  </div>
</template>

<style scoped lang="less">
.commenArea {
  width: 90%;
  height: 300px;
  padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
  border-radius: 10px;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  top: 15px;
  left: 32%;
  font-size: 1rem;
  color: #e3631b;
  font-weight: bold;
  font-family: ui-sans-serif;
  li {
    display: inline-block;
  }
}
.notice {
  position: relative;
  top: 45%;
}
article {
  text-indent: 2em;
}
.selectVocabularyArea {
  padding: 5px;
  border: 2px solid gray;
  margin: 0 3px;
}

.templateListBox {
  margin-top: calc(2 * var(--van-popup-close-icon-size));
  height: calc(100% - var(--van-popup-close-icon-size) * 2);
  padding-bottom: 20px;
  overflow-y: scroll;
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
      color: blue;
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
}
.popupTitle {
  position: absolute;
  top: calc(0.7 * var(--van-popup-close-icon-size));
  left: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  color: rgb(235 137 38);
}
:deep(.van-cell__value) {
  overflow: visible;
}
:deep(.van-cell) {
  transition: all 0.3s ease-in-out;
}
</style>
