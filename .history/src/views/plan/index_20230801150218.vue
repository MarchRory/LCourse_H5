<script setup lang="ts">
import { onMounted, defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { usePlanStore } from "@/store/modules/plan/index";
import swpuLogo from '@/assets/schoolLogo.jpg'
const route = useRouter();
const isLoad = ref(false);
const skeletonLoad = ref(false);
const courseSke = defineAsyncComponent(
  () => import("@/components/coursePageSkeleton/coursePageSkeleton.vue"),
);
const planStore = usePlanStore();
const { list, total } = storeToRefs(planStore);

onMounted(() => {
  skeletonLoad.value = true
  planStore.getObjectives()
  skeletonLoad.value = false
})

const openObject = (id: number) => {
  route.push({ path: "/coursesPlanDetail", query: { id: id } });
};
</script>

<template>
  <course-ske :ske-load="skeletonLoad"></course-ske>
  <div v-if="!skeletonLoad" class="container">
    <van-sticky :offset-top="0">
      <header>
        <div class="temp" style="width: 12vw"></div>
        <div class="title">
          课<span style="color: #8e8e8e; font-weight: 300">程</span>规<span style="color: #8e8e8e; font-weight: 300">划</span>
        </div>
        <div class="tools">
          <van-icon name="apps-o" size="32" />
        </div>
      </header>
    </van-sticky>
    <van-loading color="#1989fa" v-if="isLoad" />
    <div class="list" v-if="!isLoad">
      <div class="object" v-for="(obj, index) in list" :key="index" @click="openObject(obj.id)">
        <div class="seat">
          <van-image width="90%" height="90%" fit="contain" position="center" :src="swpuLogo" />
        </div>
        <div class="ObjInfo">
          <div class="name">
            {{ obj.objectivesName }}
          </div>
          <div>
            <van-progress v-if="obj.fixRestrictions" :pivot-text="`${(obj.completed / obj.fixRestrictions) * 100}%`"
              color="#E3562A" :percentage="(obj.completed / obj.fixRestrictions) * 100" />
            <div v-else style="color: #bbbbba">该目标暂时没有设置修读要求</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <router-view />
</template>

<style scoped lang="less">
@objInfoWidth: 430px;

.container {
  width: 100%;
  overflow-x: hidden;

  header {
    height: 140px;
    width: calc(100vw - 40px);
    display: flex;
    padding-left: 20px;
    padding-right: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .title {
      font-family: Gen Jyuu Gothic;
      font-size: 42px;
      font-weight: 500;
      line-height: 32px;
      text-align: center;
      letter-spacing: 5px;
    }
  }

  .list {
    padding: 20px;
    overflow-y: auto;
    padding-bottom: 50px;

    .object {
      width: 660px;
      height: 200px;
      border-radius: 10px;
      margin-top: 18px;
      border: 1px solid #cdcdcd;
      overflow: hidden;
      display: flex;
      flex-direction: row;
      margin-top: 20px;
      padding-right: 30px;

      .seat {
        height: 100%;
        width: calc(690px - @objInfoWidth);
      }

      .ObjInfo {
        width: @objInfoWidth;
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: 100%;

        .name {
          font-family: Gen Jyuu Gothic;
          font-size: 37px;
          font-weight: 300;
          line-height: 26px;
          letter-spacing: 3px;
          text-align: left;
          margin-bottom: 40px;
        }

        :deep(.van-progress) {
          height: 12px;
        }
      }
    }
  }
}
</style>
