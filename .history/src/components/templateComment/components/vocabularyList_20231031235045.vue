<script setup lang="ts">
import { ref, watch } from "vue";
import { vocabularySecondParams, paginatin } from "../types";
const pagination = ref<paginatin>({
  page: 1,
  pageSize: 20,
  key: "",
});
</script>

<template>
  <div></div>
</template>

<style scoped lang="less"></style>
