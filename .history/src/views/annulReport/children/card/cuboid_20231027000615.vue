<script setup lang="ts">
const props = defineProps<{
  topColor: string;
  frontColor: string;
  asideColor: string;
}>();
</script>

<template>
  <div>
    <div class="cuboid">
      <div
        class="cuboid-top"
        :style="{ backgroundColor: props.topColor }"
      ></div>
      <div
        class="cuboid-front"
        :style="{ backgroundColor: props.frontColor }"
      ></div>
      <div
        class="cuboid-aside"
        :style="{ backgroundColor: props.asideColor }"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.cuboid {
  transform-style: preserve-3d;
  transform: rotateX(330deg) rotateY(42deg);
  margin-bottom: -150px;
  .cuboid-top {
    height: 200px;
    transform: rotateX(80deg) translateZ(36px);
  }
  .cuboid-front {
    height: 30px;
    width: 98%;
    transform: rotateY(0deg) translateZ(-30px) translateX(83px)
      translateY(-30px);
  }
  .cuboid-aside {
    height: 29px;
    transform: rotateY(-97deg) translateZ(22px) translateX(-254px);
  }
}
</style>
