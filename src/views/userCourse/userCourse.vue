<template>
  <div class="my-courses-container">
    <XdHeader title="我的课程" />
    <van-dropdown-menu active-color="#e1562a">
      <van-dropdown-item v-model="state" :options="option" />
    </van-dropdown-menu>
    <div class="list-container">
      <van-pull-refresh v-model="reLoad" @refresh="refresh">
        <course-page-skeleton :skeLoad="listLoading" v-if="listLoading" />
        <div class="list" v-else>
          <van-empty v-if="!hasTotal" description="暂无课程信息" />
          <van-list
            v-else
            @touchmove.stop
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <TransitionGroup name="list-right-in">
              <van-cell v-for="course in courseList" :key="course.id">
                <course-preview :course="course"></course-preview>
              </van-cell>
            </TransitionGroup>
          </van-list>
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "userCourse",
};
</script>
<script setup lang="ts">
import { getCourses } from "@/api/courses/courses";
import CoursePreview from "@/components/coursePreview/coursePreview.vue";
import CoursePageSkeleton from "@/components/coursePageSkeleton/coursePageSkeleton.vue";
import { useUserStore } from "@/store/modules/user/index";
import { ref, reactive } from "vue";
import { listProps } from "vant";
const XdHeader = defineAsyncComponent(() => import('@/components/header/index.vue'))
const userStore = useUserStore();
const courseList = ref([]);
const router = useRouter();
const state = ref(null);
const passType = ref(null);
const listLoading = ref(false);
const hasTotal = ref(0);
const reLoad = ref(false);
watch(state, () => {
  passType.value = state.value >= 3 ? 1 : null;
  hasTotal.value = 0;
  courseList.value = [];
  onLoad();
});
const option = [
  { text: "全部", value: null },
  { text: "报名中", value: 2 },
  { text: "审核中", value: 5 },
  { text: "进行中", value: 3 },
  { text: "已结束", value: 4 },
];
const loading = ref(false);
const finished = ref(false);
const refresh = () => {
  reLoad.value = true;
  courseList.value = [];
  hasTotal.value = 0;
  (async () => {
    onLoad();
  })().finally(() => {
    reLoad.value = false;
  });
};
const onLoad = () => {
  listLoading.value = true;
  getCourses({
    userType: 1,
    pageSize: 45,
    state: state.value,
    passType: passType.value,
  })
    .then((res) => {
      const { list, total } = res.data;
      hasTotal.value = total;
      if (!total) {
        return;
      }
      list.forEach((item) => {
        courseList.value.push(item);
      });
    })
    .finally(() => {
      loading.value = true;
      finished.value = courseList.value.length >= hasTotal.value;
      listLoading.value = false;
    });
};
onLoad();
</script>

<style scoped lang="less">
.my-courses-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  .list-container {
    width: 100%;
    flex: 1;
    overflow-y: auto;
  }
}
:deep(.van-dropdown-menu__bar) {
  width: 100vw;
  height: calc(var(--van-dropdown-menu-height) * 0.7);
  background-color: white;
}
:deep(.van-dropdown-item__option) {
  padding: 15px 30px;
}
</style>
