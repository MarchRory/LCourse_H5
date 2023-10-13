<script lang="ts" scoped>
import { defineProps, defineEmits } from "vue";
import { commentTemplate } from "../../../api/types/comment";
const props = defineProps<{
  template: commentTemplate;
}>();
const emits = defineEmits<{
  (e: "onChoose", template: commentTemplate): void;
}>();
</script>

<template></template>

<style lang="less" scoped></style>
