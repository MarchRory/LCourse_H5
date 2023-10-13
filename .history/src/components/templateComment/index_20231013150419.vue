<script lang="ts" setup>
import { ref, defineProps, defineEmits, defineAsyncComponent } from "vue";
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
const templateItemInList = defineAsyncComponent(
  () => import("./components/templateItemInlist.vue")
);
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
            <templateItemInList :template="template" />
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
