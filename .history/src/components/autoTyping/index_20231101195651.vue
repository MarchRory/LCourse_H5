<script setup lang="ts">
const props = defineProps<{
  text: string;
}>();
</script>

<template>
  <div>
    <div class="auto-typing">{{ props.text }}</div>
  </div>
</template>

<style scoped lang="less">
--count: 0ch;
@keyframes typing {
  0% {
    width: 0ch;
  }
  100% {
    width: var(--count);
  }
}

.auto-typing {
  font-family: monospace;
  font-weight: bold;
  font-size: 30px;
  color: #09f;
  border-right: 1px solid transparent;
  width: 0ch;
  animation: 2s typing steps(var(--count), jump-none) forwards;
}
</style>
