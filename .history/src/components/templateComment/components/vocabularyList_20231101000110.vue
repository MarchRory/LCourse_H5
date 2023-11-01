<script setup lang="ts">
import { ref, watch } from "vue";
import { vocabularySecondParams, pagination } from "../types";
import { vocabularyType } from "@/api/types/comment/index";
import { getVocabularyListAPI } from "@/api/courses/courses";
import { Response } from "@/utils/http/types";
const props = defineProps<{
  secondParams: vocabularySecondParams;
}>();
const emits = defineEmits<{
  (e: "onChange", wordObj: vocabularyType): void;
}>();
const Pagination = ref<pagination>({
  page: 1,
  pageSize: 20,
  key: "",
});
function loadVocabularyList() {}
watch(
  () => props.secondParams,
  (newVal, oldVal) => {
    Pagination.value.page = 1;
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div></div>
</template>

<style scoped lang="less"></style>
