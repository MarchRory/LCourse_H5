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
const templateReg = new RegExp(/(.+?)(?=([^{}]*(?:\"(.+)\")?)*$)/g);
const isOpenTemplateList = ref(false);
const extractTempalte = (template: string) => {
  let matches = template.match(templateReg);
  return matches!.map((str) => {
    return str.replace(/"/g, "");
  });
};
const loadSelfCommentTemplateList = () => {
  getCommentTemplateAPI(commentTemplateListParams.value).then(
    (res: Response<commentTemplateResultModel>) => {
      const { list, total } = res.data;
      console.log(list);
      list.forEach((item: commentTemplate) => {
        item.templateText = extractTempalte(item.templateText as string);
        selfCommentTemplateList.value.push(item);
      });
      selfCommentTemplateTotal.value = total;
    }
  );
};
watch(
  () => props.level,
  (newVal: number) => {
    commentTemplateListParams.value.level = newVal * 2;
    selfCommentTemplateList.value = [];
    selfCommentTemplateTotal.value = 0;
  }
);
const beginComment = async () => {
  if (!props.level) {
    showFailToast("先打分再进行操作吧");
    return;
  }
  if (!templateTextCopy.value.length) {
    loadSelfCommentTemplateList();
  }
  isOpenTemplateList.value = true;
};
const openTemplateSwitch = () => {
  isOpenTemplateList.value = true;
};
const templateTextCopy = ref<string[]>([]);
const vocabulary = ref<any>();
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
      <template>
        <div>
          <article>
            <div></div>
          </article>
        </div>
      </template>
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
</style>
