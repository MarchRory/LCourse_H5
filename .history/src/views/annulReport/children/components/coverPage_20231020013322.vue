<script setup lang="ts">
import { gsap } from "gsap";
import { onMounted } from "vue";
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();
const props = defineProps<{
  batch: string;
}>();

onMounted(() => {
  gsap.fromTo(
    "#reportName",
    {
      yPercent: -10,
      duration: 1,
      yoyo: true,
      repeat: 2,
      yoyoEase: true,
    },
    {
      yPercent: 10,
      yoyo: true,
      repeat: -1,
      yoyoEase: true,
    }
  );
});
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
      <transition :css="false">
        <div id="reportName">
          <span id="year">{{ batch.substring(0, 4) }}</span
          ><br />
          <span id="words">{{ batch.substring(4, batch.length - 2) }}</span
          ><br />
          <span id="words">{{
            batch.substring(batch.length - 2, batch.length)
          }}</span>
        </div>
      </transition>
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
  padding-top: 30px;
  width: 100vw;
  height: 8vh;
  .guide {
    font-size: 30px;
    font-weight: bolder;
    letter-spacing: 2px;
    font-family: sans-serif;
  }
  .username {
    font-size: 50px;
    color: rgb(68, 44, 17);
    font-weight: bolder;
    letter-spacing: 3px;
    font-family: inherit;
  }
}
.main {
  width: 100vw;
  height: 67vh;
  #reportName {
    position: relative;
    top: 30%;
    font-weight: 700;
    transform: rotate(-5deg);
    font-size: 80px;
    #year {
      color: rgb(55, 135, 172);
      letter-spacing: 5px;
    }
  }
}
footer {
  width: 100vw;
  height: 25vh;
  background-color: teal;
}
</style>
