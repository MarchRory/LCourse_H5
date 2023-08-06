<template>
  <van-config-provider :theme-vars="themeVars">
    <div ref="header">
      <van-nav-bar @click-right="openEvaluations">
        <template #title><span style="color: #e1562a">我的课程</span></template>
        <template #right>
          <van-icon v-if="!userStore.EvaluationsCnt" name="chat-o" size="28" />
          <van-icon v-else name="chat-o" size="28" :badge="userStore.EvaluationsCnt" />
        </template>
      </van-nav-bar>
      <van-dropdown-menu active-color="#e1562a">
        <van-dropdown-item v-model="state" :options="option" />
      </van-dropdown-menu>
    </div>
    <course-page-skeleton :skeLoad="listLoading" v-if="listLoading"></course-page-skeleton>
    <div class="container" v-else :style="{ height: `calc(100vh - ${})` }">
      <van-empty v-if="!hasTotal" description="暂无课程信息" />

      <van-pull-refresh v-else v-model="reLoad" @refresh="refresh">
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
import { ref, reactive, onMounted } from 'vue'
const userStore = useUserStore()
const themeVars = reactive({
  navBarTextColor: "#e1562a",
  navBarIconColor: "#e1562a",
});
const courseList = ref([]);
const header = ref()
const headerHeight = ref(0)
const router = useRouter();
const state = ref(null);
const pageNUm = ref(1)
const passType = ref(null)
const listLoading = ref(false);
const hasTotal = ref(0)
const reLoad = ref(false)
watch(state, () => {
  passType.value = state.value >= 3 ? 1 : null
  hasTotal.value = 0
  courseList.value = []
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
      passType: passType.value
    })
    .then((res) => {
      const { list, total } = res.data
      hasTotal.value = total
      if (!total) {
        return;
      }
      courseList.value = res.data.list;
    })
    .finally(() => {
      loading.value = true;
      finished.value = true;
      listLoading.value = false;
    })
};
onLoad();
const onClickLeft = () => {
  router.back();
};
const openEvaluations = () => {
  router.push({ path: '/evalutions' })
}

onMounted(() => {
  console.log(header.value.offsetHeight)

})
</script>

<style scoped lang="less">
.course-list {
  overflow-y: auto;
}

.container {
  padding: 20px;
  background-color: #f5f6f8;

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
