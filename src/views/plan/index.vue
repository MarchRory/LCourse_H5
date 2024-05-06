<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import swpuLogo from "@/assets/logo_D.png";
import { useUserStore } from "@/store/modules/user";
import { CourseCategory } from "@/api/types/public";

const XdHeader = defineAsyncComponent(() => import('@/components/header/index.vue'))

defineOptions({
  name: "plan"
})

const isLoad = ref(false);
const skeletonLoad = ref(false);
const courseSke = defineAsyncComponent(
  () => import("@/components/coursePageSkeleton/coursePageSkeleton.vue")
);
const reLoad = ref(false);

const userStore = useUserStore()
const {cateGoryScore} = storeToRefs(userStore)
const refresh = () => {
  reLoad.value = true;
  (async () => {
    userStore.updateCateGoryScore();
  })().finally(() => {
    reLoad.value = false;
  });
};
</script>

<template>
  <course-ske :ske-load="skeletonLoad"></course-ske>
  <div class="container">
    <XdHeader title="学分进度" hiden-back />
    <van-pull-refresh v-model="reLoad" @refresh="refresh">
      <div v-if="!skeletonLoad" class="container" @touchmove.stop>
        <van-loading color="#1989fa" v-if="isLoad" />
        <div class="list" v-if="!isLoad && cateGoryScore && cateGoryScore.length">
          <div
            class="object"
            v-for="(obj, index) in cateGoryScore"
            :key="index"
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
                {{ obj.name }}
              </div>
              <div>
                <van-progress
                  v-if="obj.name !== CourseCategory['三下乡']"
                  :pivot-text="`${obj.value}分`"
                  color="#E3562A"
                  :percentage="(obj.value / 20) * 100"
                />
                <van-progress
                  v-else
                  color="#E3562A"
                  :percentage="obj.value ? 100 : 0"
                />
              </div>
            </div>
          </div>
        </div>
        <van-empty v-else description="数据暂未生成" />
      </div>
    </van-pull-refresh>
  </div>
</template>

<style scoped lang="less">
@objInfoWidth: 430px;

.container {
  width: 100%;
  overflow-x: hidden;
  //overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: rgb(245, 246, 248);
  flex: 1;

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
