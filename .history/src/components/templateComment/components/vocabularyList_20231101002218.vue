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
const vocabularyTotal = ref<number>(0);
const listLoad = ref<boolean>(true);
function loadVocabularyList() {
  listLoad.value = true;
  getVocabularyListAPI({ ...Pagination.value, ...props.secondParams })
    .then((res: Response<vocabularyResultModel>) => {
      const { list, total } = res.data;
      for (let i = 0; i < list.length; i++) {
        vocabularyList.value.push(list[i]);
      }
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
    vocabularyList.value = [];
    Pagination.value.page = 1;
    loadVocabularyList();
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div></div>
</template>

<style scoped lang="less"></style>
