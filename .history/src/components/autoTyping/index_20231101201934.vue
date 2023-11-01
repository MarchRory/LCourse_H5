<script setup lang="ts">
import { onMounted, ref } from "vue";
const props = defineProps<{
  text: string;
}>();
const context = ref<HTMLElement>();
onMounted(() => {
  if (props.text) {
    // context.value?.style.setProperty("--count", `${props.text.length}ch`);
  }
});
</script>

<template>
  <div>
    <h ref="context" class="auto-typing">{{ props.text }}</h>
  </div>
</template>

<style scoped>
.auto-typing {
  display: contents;
  --count: 6ch;
  font-family: fantasy;
  font-weight: bold;
  font-size: 50px;
  font-weight: bolder;
  color: rgb(16, 141, 224);
  overflow: hidden;
  border-right: 1px solid transparent;
  width: 0ch;
  animation: 2s typing steps(6, jump-none) forwards;
}
@keyframes typing {
  0% {
    width: 0ch;
  }
  100% {
    width: 6ch;
  }
}
</style>
