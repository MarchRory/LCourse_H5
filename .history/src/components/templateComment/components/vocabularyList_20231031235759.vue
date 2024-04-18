<script setup lang="ts">
import { ref, watch } from "vue";
import { vocabularySecondParams, pagination } from "../types";
import { vocabularyType } from "@/api/types/comment/index";
import { Response } from "@/utils/http/types";
const props = defineProps<{
  secondParams: vocabularySecondParams;
}>();
const emits = defineEmits<{
  (e: "onChange", wordObj: vocabularyType): void;
}>();
const pagination = ref<pagination>({
  page: 1,
  pageSize: 20,
  key: "",
});
</script>

<template>
  <div></div>
</template>

<style scoped lang="less"></style>
