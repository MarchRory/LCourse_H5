<script setup lang="ts">
import { gsap } from "gsap";
import { onMounted } from "vue";
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();
const props = defineProps<{
  batch: string;
}>();
const emits = defineEmits<{
  (e: "nextPage"): void;
}>();
onMounted(() => {
  gsap.fromTo(
    "#reportName",
    {
      yPercent: -5,
      duration: 2,
      yoyo: true,
    },
    {
      yPercent: 5,
      yoyo: true,
      duration: 2,
      repeat: -1,
    }
  );
});
function reportNameEnter(el, done) {
  gsap.to("#reportName", {
    opacity: 1,
    delay: 1,
    onComplete: done,
  });
}
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
      <Transition appear :css="false" @enter="reportNameEnter">
        <div id="reportName">
          <span id="year">{{ batch.substring(0, 4) }}</span
          ><br />
          <span id="words">{{ batch.substring(4, batch.length - 2) }}</span
          ><br />
          <span id="words">{{
            batch.substring(batch.length - 2, batch.length)
          }}</span>
        </div>
      </Transition>
    </div>
    <footer>
      <div @click="emits('nextPage')" class="nextBtn">回顾本学年</div>
    </footer>
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
  .nextBtn {
    position: relative;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(243, 154, 30);
    border-radius: 30px;
    padding: 30px 40px;
    color: rgb(235, 232, 232);
    font-weight: bold;
    font-size: 35px;
    letter-spacing: 3px;
    width: fit-content;
  }
}
</style>
