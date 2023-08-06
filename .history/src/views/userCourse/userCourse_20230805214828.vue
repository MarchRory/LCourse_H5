<template>
  <van-config-provider :theme-vars="themeVars">
    <van-nav-bar>
      <template #title><span style="color: #e1562a">我的课程</span></template>
      <template #right @click="openEvaluations">
        <van-icon v-if="!userStore.EvaluationsCnt" name="chat-o" size="28" />
        <van-icon v-else name="chat-o" size="25" :badge="userStore.EvaluationsCnt" />
      </template>
    </van-nav-bar>
    <van-dropdown-menu active-color="#e1562a">
      <van-dropdown-item v-model="state" :options="option" />
    </van-dropdown-menu>
    <course-page-skeleton :skeLoad="listLoading" v-if="listLoading"></course-page-skeleton>
    <div class="container" v-else>
      <van-pull-refresh v-model="reLoad" @refresh="refresh">
        <div class="list">
          <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="course in courseList" :key="course.id">
              <course-preview :course="course"></course-preview>
            </van-cell>
          </van-list>
        </div>
      </van-pull-refresh>
    </div>
  </van-config-provider>
</template>

<script setup>
import courseApi from "@/api/courses/courses.ts";
import CoursePreview from "@/components/coursePreview/coursePreview.vue";
import CoursePageSkeleton from "@/components/coursePageSkeleton/coursePageSkeleton.vue";
import { useUserStore } from '@/store/modules/user/index'
import { ref, reactive } from 'vue'
const userStore = useUserStore()
const themeVars = reactive({
  navBarTextColor: "#e1562a",
  navBarIconColor: "#e1562a",
});
const courseList = ref([]);
const router = useRouter();
const state = ref(0);
const listLoading = ref(false);
const reLoad = ref(false)
watch(state, () => {
  onLoad();
});
const option = [
  { text: "全部", value: null },
  { text: "报名中", value: 2 },
  { text: '审核中', value: -1 },
  { text: "进行中", value: 3 },
  { text: "已结束", value: 4 },
];
const loading = ref(false);
const finished = ref(false);

const refresh = () => {
  reLoad.value = true;
  (async () => {
    courseApi
      .getCourses({
        userType: 1,
        pageSize: 10,
        state: state.value,
      })
      .then((res) => {
        courseList.value = res.data.list;
      })
      .finally(() => {
        loading.value = true;
        finished.value = true;
      })

  })()
    .finally(() => {
      reLoad.value = false
    })
}

const onLoad = () => {

  listLoading.value = true;
  courseApi
    .getCourses({
      userType: 1,
      pageSize: 10,
      state: state.value,
    })
    .then((res) => {
      courseList.value = res.data.list;
    })
    .finally(() => {
      loading.value = true;
      finished.value = true;
      listLoading.value = false;
    })
};
const onClickLeft = () => {
  router.back();
};
const openEvaluations = () => {
  router.push({ path: '/evalutions' })
}
</script>

<style scoped lang="less">
.course-list {
  overflow-y: auto;
}

.container {
  padding: 20px;

  .list {
    height: calc(100vh - 20px - var(--van-tabbar-height) - var(--van-nav-bar-height)*2);
    overflow-y: auto;
  }

  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>
