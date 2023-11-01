<script setup lang="ts">
import { gsap } from "gsap";
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();
const props = defineProps<{
  batch: string;
}>();
</script>

<template>
  <div class="container">
    <header>
      <div class="">
        <div class="guide">种下的花, 结出了果</div>
        <div class="username">@ {{ userStore.name }}</div>
      </div>
    </header>
    <div class="main">
      <div id="reportName">{{ batch }}</div>
    </div>
    <footer></footer>
  </div>
</template>

<style scoped lang="less">
.container {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
}
header {
  padding-top: 40px;
  width: 100vw;
  height: 8vh;
  background-color: aqua;
  .guide {
    font-size: 30px;
    font-weight: bolder;
    letter-spacing: 2px;
    font-family: sans-serif;
  }
  .username {
    font-size: 50px;
    font-weight: bolder;
    letter-spacing: 2px;
  }
}
.main {
  width: 100vw;
  height: 67vh;
  background-color: orange;
}
footer {
  width: 100vw;
  height: 25vh;
  background-color: teal;
}
</style>
