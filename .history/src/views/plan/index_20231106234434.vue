<script lang="ts">
export default {
  name: "plan",
};
</script>

<script setup lang="ts">
import { onMounted, defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { usePlanStore } from "@/store/modules/plan/index";
import swpuLogo from "@/assets/logo_D.png";
const route = useRouter();
const isLoad = ref(false);
const skeletonLoad = ref(false);
const courseSke = defineAsyncComponent(
  () => import("@/components/coursePageSkeleton/coursePageSkeleton.vue")
);
const reLoad = ref(false);
const planStore = usePlanStore();
const { list } = storeToRefs(planStore);

onMounted(() => {
  skeletonLoad.value = true;
  planStore.getObjectives();
  skeletonLoad.value = false;
});

const refresh = () => {
  reLoad.value = true;
  (async () => {
    planStore.getObjectives();
  })().finally(() => {
    reLoad.value = false;
  });
};

const openObject = (id: number) => {
  route.push({ path: "/coursesPlanDetail", query: { id: id } });
};
</script>

<template>
  <course-ske :ske-load="skeletonLoad"></course-ske>
  <van-pull-refresh v-model="reLoad" @refresh="refresh">
    <header>
      <div class="temp" style="width: 12vw"></div>
      <div class="title">
        课<span style="color: #8e8e8e; font-weight: 300">程</span>规<span
          style="color: #8e8e8e; font-weight: 300"
          >划</span
        >
      </div>
      <div class="tools">
        <van-icon name="apps-o" size="32" style="opacity: 0" />
      </div>
    </header>
    <div v-if="!skeletonLoad" class="container" @touchmove.stop>
      <van-loading color="#1989fa" v-if="isLoad" />
      <div class="list" v-if="!isLoad && list && list.length">
        <div
          class="object"
          v-for="(obj, index) in list"
          :key="index"
          @click="openObject(obj.id)"
        >
          <div class="seat">
            <van-image
              width="80%"
              height="80%"
              fit="contain"
              :lazy-load="true"
              :src="swpuLogo"
            />
          </div>
          <div class="ObjInfo">
            <div class="name">
              {{ obj.objectivesName }}
            </div>
            <div>
              <van-progress
                v-if="obj.fixRestrictions"
                :pivot-text="`${(obj.completed / obj.fixRestrictions) * 100}%`"
                color="#E3562A"
                :percentage="(obj.completed / obj.fixRestrictions) * 100"
              />
              <div v-else style="color: #bbbbba">
                该目标暂时没有设置修读要求
              </div>
            </div>
          </div>
        </div>
      </div>
      <van-empty v-else description="当前学期暂无规划安排" />
    </div>
  </van-pull-refresh>
</template>

<style scoped lang="less">
@objInfoWidth: 430px;

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

.container {
  width: 100%;
  overflow-x: hidden;
  //overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: rgb(245, 246, 248);
  height: calc(100vh - 140px - var(--van-tabbar-height));

  .list {
    padding: 20px;
    //overflow-y: auto;
    padding-bottom: 50px;

    .object {
      width: 660px;
      height: 200px;
      border-radius: 10px;
      margin-top: 18px;
      //border: 1px solid #cdcdcd;
      overflow: hidden;
      display: flex;
      flex-direction: row;
      margin-top: 20px;
      padding-right: 30px;
      background-color: white;
      box-shadow: 0 0 15px rgba(1, 1, 1, 0.15);

      .seat {
        height: 100%;
        width: calc(690px - @objInfoWidth);
        display: flex;
        align-items: center;
        justify-content: center;
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
