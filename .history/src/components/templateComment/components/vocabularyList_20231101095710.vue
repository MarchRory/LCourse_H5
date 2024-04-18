<script setup lang="ts">
import { ref, watch } from "vue";
import { vocabularySecondParams, vocabularyPagination } from "../types";
import {
  vocabularyResultModel,
  vocabularyType,
} from "@/api/types/comment/index";
import { getVocabularyListAPI } from "@/api/courses/courses";
import { Response } from "@/utils/http/types";
const props = defineProps<{
  secondParams: vocabularySecondParams;
}>();
const emits = defineEmits<{
  (e: "onChange", wordObj: vocabularyType): void;
}>();
const Pagination = ref<vocabularyPagination>({
  page: 1,
  pageSize: 20,
  key: "",
});
const vocabularyList = ref<vocabularyType[]>([] as vocabularyType[]);
const columns = ref<{ text: string; value: string }[]>();
const vocabularyTotal = ref<number>(0);
const listLoad = ref<boolean>(true);
function loadVocabularyList() {
  listLoad.value = true;
  getVocabularyListAPI({ ...Pagination.value, ...props.secondParams })
    .then((res: Response<vocabularyResultModel>) => {
      const { list, total } = res.data;
      vocabularyList.value = vocabularyList.value.concat(list);
      const newColumns = list.map((item) => {
        return {
          text: item.word,
          value: item.word,
        };
      });
      columns.value = columns.value?.concat(newColumns);
      vocabularyTotal.value = total;
    })
    .finally(() => {
      listLoad.value = false;
    });
}
function chooseWord(wordObj: vocabularyType) {
  emits("onChange", wordObj);
}
watch(
  () => props.secondParams,
  (newVal, oldVal) => {
    console.log(newVal);
    columns.value = [];
    vocabularyList.value = [];
    Pagination.value.page = 1;
    loadVocabularyList();
  },
  { deep: true, immediate: true }
);

watch(
  () => Pagination.value.key,
  (newVal) => {
    if (!newVal) {
      vocabularyList.value = [];
      columns.value = [];
      Pagination.value.page = 1;
      loadVocabularyList();
    }
  }
);
</script>

<template>
  <div>
    <van-picker
      title="词汇"
      :loading="listLoad"
      :columns="columns"
      @cancel="listLoad = false"
      @confirm="chooseWord"
    >
      <template #title>
        <van-field
          v-model="Pagination.key"
          placeholder="输入关键字搜索词汇"
          clearable
        />
      </template>
    </van-picker>
  </div>
</template>

<style scoped lang="less">
:deep(.van-field) {
  flex-wrap: wrap;
  width: 52%;
  margin: 0 auto;
}
</style>
