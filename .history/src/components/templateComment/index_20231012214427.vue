<script lang="ts" setup>
import { ref, defineProps, defineEmits, computed } from "vue";
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
      });
      selfCommentTemplateTotal.value = total;
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
      position="right"
      :style="{ width: '75%', height: '100%' }"
    >
      <div>
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
            <article class="templateItem">
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
.templateItem {
  width: 90%;
  height: auto;
  padding: 10px;
  border-radius: 10px;
  text-align: left;
  border: 2px solid black;
  box-shadow: 0 0 10px rgb(139, 139, 139, 0.4);
}
</style>
