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
  type: string;
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
const loadSelfCommentTemplateList = () => {
  getCommentTemplateAPI(commentTemplateListParams.value).then(
    (res: Response<commentTemplateResultModel>) => {
      const { list, total } = res.data;
      selfCommentTemplateList.value = list;
      selfCommentTemplateTotal.value = total;
    }
  );
};
const templateTextCopy = ref<string>("");
const vocabulary = ref<any>();
</script>

<template>
  <div class="commenArea"></div>
</template>

<style scoped lang="less">
.commentArea {
  width: 100%;
  height: 140px;
  padding: 12px;
  border-radius: 10px;
  border: 2px solid black;
}
</style>
