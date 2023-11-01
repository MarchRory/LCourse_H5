<script setup lang="ts">
import { ref, watch } from "vue";
import { vocabularySecondParams, pagination } from "../types";
const props = defineProps<{
  secondParams: vocabularySecondParams;
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
