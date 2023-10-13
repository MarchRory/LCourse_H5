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
  <div class="commenArea">
    <span v-if="!isUse">打分后可以使用自我评价文本模板</span>
    <div v-else></div>
  </div>
</template>

<style scoped lang="less">
.commenArea {
  width: 96%;
  height: 300px;
  padding: 30px 5px;
  border-radius: 10px;
}
</style>
