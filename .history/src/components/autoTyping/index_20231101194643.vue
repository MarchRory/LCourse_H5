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
/* .typing(@count: 0, @duration: 0, @delay: 0) {
  overflow: hidden;
  border-right: 1px solid transparent;
  width: @@count + 1ch;
  font-family: Consolas, Monaco, monospace;
  white-space: nowrap;
  animation:
    typing @@duration + "s" steps(@@count + 1) @@delay + "s" infinite backwards,
    caret @@delay + "s" infinite forwards;
}
.auto-typing {
  font-weight: bold;
  font-size: 30px;
  color: #09f;
  .typing(52, 5);
}
.caret(@percent) when (ispercentage(@percent)) {
  @percent: extract(@percent, 2);
  border-right-color: currentColor;
}
.caret(50);
.typing(from {width: 0;}); */
@keyframes typing {
  0% {
    width: 0;
  }
  100% {
    width: @@count + 1ch;
  }
}

@keyframes caret {
  50% {
    border-right-color: currentColor;
  }
}

.auto-typing {
  font-family: monospace;
  font-weight: bold;
  font-size: 30px;
  color: #09f;
  border-right: 1px solid transparent;
  width: 0;
  animation:
    typing @@duration + "s" steps(@@count + 1) @@delay + "s" infinite forwards,
    caret @@delay + "s" infinite forwards;
}
</style>
