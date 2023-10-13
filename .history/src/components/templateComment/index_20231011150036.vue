<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";
import {
  commentTemplate,
  commentTemplateResultModel,
  templateAndVocabularyListParamsType,
} from "../../api/types/comment";
import { getCommentTemplateAPI } from "@/api/courses/courses";
import { Response } from "@/utils/http/types";

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
const isUse = ref(false);
const isOpenTemplateList = ref(false);
const loadSelfCommentTemplateList = () => {
  getCommentTemplateAPI(commentTemplateListParams.value).then(
    (res: Response<commentTemplateResultModel>) => {
      const { list, total } = res.data;
      selfCommentTemplateList.value = list;
      selfCommentTemplateTotal.value = total;
    }
  );
};
watch(
  () => props.level,
  (newVal: number) => {
    commentTemplateListParams.value.level = newVal;
  }
);
const beginComment = async () => {
  if (!isUse) {
    return;
  }
  loadSelfCommentTemplateList();
};
const openTemplateSwitch = () => {
  isOpenTemplateList.value = true;
};
const templateTextCopy = ref<string>("");
const vocabulary = ref<any>();
</script>

<template>
  <div>
    <ul @click="openTemplateSwitch">
      <li><van-icon name="replay" size="20" /></li>
      <li>重新选择</li>
    </ul>
    <div class="commenArea" @click="beginComment">
      <span v-if="!isUse">打分后可以使用自我评价文本模板</span>
      <div v-else></div>
    </div>
    <van-popup
      v-model:show="isOpenTemplateList"
      closeable
      position="right"
      :style="{ width: '75%', height: '100%' }"
    >
      <template>
        <div></div>
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
  bottom: 30px;
  left: 36%;
  font-size: 1rem;
  color: #e3631b;
  font-weight: bold;
  font-family: ui-sans-serif;
  li {
    display: inline-block;
  }
}
</style>
