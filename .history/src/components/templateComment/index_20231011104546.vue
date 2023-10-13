<script lang="ts" setup>
import {
  ref,
  defineProps,
  defineEmits,
  defineAsyncComponent,
  computed,
  watch,
} from "vue";
import { commentTemplate } from "../../api/types/comment";

const props = defineProps<{
  template: commentTemplate;
}>();
const emits = defineEmits<{
  (e: "onChange", resText: string);
}>();

const templateTextCopy = ref<string>("");
const vocabulary = ref<any>();
watch(
  () => props.template.id,
  () => {
    templateTextCopy.value = props.template.templateText;
  }
);
</script>

<template>
  <div></div>
</template>

<style scoped lang="less"></style>
