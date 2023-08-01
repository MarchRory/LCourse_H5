<template>
  <van-config-provider :theme-vars="themeVars">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
      <template #title><span style="color: #e1562a">历史目标</span></template>
    </van-nav-bar>
    <course-page-skeleton :skeLoad="listLoading" v-if="listLoading"></course-page-skeleton>
    <div class="container" v-else>
      <van-list class="list" v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div>
          <van-cell v-for="obj in objectList" :key="obj.id" @click="openObject(obj.id)">
            <div class="object">
              <div class="seat">
                <van-image width="80%" height="80%" fit="contain" :lazy-load="true" :src="swpuLogo" />
              </div>
              <div class="ObjInfo">
                <div class="name">
                  {{ obj.objectivesName }}
                </div>
                <div>
                  <van-progress v-if="obj.fixRestrictions" :pivot-text="`${(obj.completed / obj.fixRestrictions) * 100
                    }%`" color="#E3562A" :percentage="(obj.completed / obj.fixRestrictions) * 100" />
                  <div v-else style="color: #bbbbba">
                    该目标暂时没有设置修读要求
                  </div>
                </div>
              </div>
            </div>
          </van-cell>
        </div>
      </van-list>
    </div>
  </van-config-provider>
</template>

<script setup>
import CoursePageSkeleton from "@/components/coursePageSkeleton/coursePageSkeleton.vue";
import OjjectsApi from "@/api/objectives/objectives.ts";
import swpuLogo from '@/assets/logo_D.png'
const themeVars = reactive({
  navBarTextColor: "#e1562a",
  navBarIconColor: "#e1562a",
});
const objectList = ref([]);
const router = useRouter();
const listLoading = ref(false);

const loading = ref(false);
const finished = ref(false);

const onLoad = () => {
  listLoading.value = true;
  OjjectsApi.getObjects({ pageSize: 5, pageNum: 1, userType: 1 }).then(
    (res) => {
      objectList.value = res.data.list;
      loading.value = true;
      finished.value = true;
      listLoading.value = false;
    },
  );
};
const onClickLeft = () => {
  router.back();
};
const openObject = (id) => {
  router.push({ path: "/coursesPlanDetail", query: { id: id } });
};
</script>

<style scoped lang="less">
@objInfoWidth: 430px;

.container {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  .list {
    overflow-y: auto;
    padding: 20px 20px 50px;
    max-height: 1400px;

    .object {
      width: 660px;
      height: 200px;
      border-radius: 10px;
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
