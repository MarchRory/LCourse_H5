<script setup lang="ts">
import { onMounted, ref } from "vue";
const props = defineProps<{
  text: string;
}>();
const context = ref<HTMLElement>();
function initAnimation() {
  // Support Space:
  context.value.innerHTML = context.value.textContent
    .replace(/\S/g, "<span>$&</span>")
    .replace(/\s/g, "<span>&nbsp;</span>");

  let delay = 0;
  document.querySelectorAll("span").forEach((span, index) => {
    delay += 0.1;

    if (index === 6) delay += 0.3;

    span.style.setProperty("--delay", `${delay}s`);
  });

  context.value.addEventListener("animationend", (e) => {
    if (e.target === document.querySelector("h1 span:last-child")) {
      context.value.classList.add("ended");
    }
  });
}

onMounted(() => {
  if (props.text) {
    initAnimation();
    // context.value?.style.setProperty("--count", `${props.text.length}ch`);
  }
});
</script>

<template>
  <div>
    <h1 ref="context">{{ props.text }}</h1>
  </div>
</template>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

h1 {
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
  font-family: monospace;
  position: relative;
}

h1::after {
  content: "";
  display: inline-block;
  position: absolute;
  width: 20px;
  height: 6rem;
  background-color: #000;
  border-radius: 2px;
  right: -30px;
}

h1.ended::after {
  animation: 1.1s cursor steps(2, jump-none) infinite;
}

@keyframes cursor {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

h1 span {
  --delay: 10s;
  display: inline-block;
  overflow: hidden;
  width: 0ch;
  animation: 0.1s text-in ease-in-out forwards;
  animation-delay: var(--delay);
}

@keyframes text-in {
  from {
    width: 0ch;
  }
  to {
    width: 1ch;
  }
}
</style>
