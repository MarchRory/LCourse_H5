<script setup lang="ts">
import { onMounted, ref } from "vue";
const props = defineProps<{
  text: string;
}>();
const text = ref<HTMLElement>();
{
  if (props.text) {
    console.log(text.value);
    text.value?.style.setProperty("--count", `${props.text.length}ch`);
  }
}
/* onMounted(() => {
       if(props.text){
      console.log(text.value)
          text.value?.style.setProperty('--count', `${props.text.length}ch`)
    } 
}); */
</script>

<template>
  <div>
    <span ref="text" class="auto-typing">{{ props.text }}</span>
  </div>
</template>

<style scoped>
@keyframes typing {
  0% {
    width: 0ch;
  }
  100% {
    width: var(--count);
  }
}

.auto-typing {
  --count: 0ch;
  font-family: fantasy;
  font-weight: bold;
  font-size: 100px;
  font-weight: bolder;
  color: rgb(16, 141, 224);
  border-right: 1px solid transparent;
  width: 0ch;
  animation: 2s typing steps(var(--count), jump-none) forwards;
}
</style>
