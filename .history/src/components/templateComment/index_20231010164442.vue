<script lang="ts" setup>
import {
  ref,
  defineProps,
  defineEmits,
  defineAsyncComponent,
  computed,
  watch,
} from "vue";
import { commentTemplate } from "../../api/types/courses/index";

const props = defineProps<{
  template: commentTemplate;
}>();
const emits = defineEmits<{
  (e: "onChange", resText: string);
}>();

const templateTextCopy = ref<string>("");
const vacabulory = ref();
watch(
  () => props.template.id,
  (newVal: number | string) => {
    templateTextCopy.value = props.template.templateText;
  }
);
</script>

<template>
  <div></div>
</template>

<style scoped lang="less"></style>
