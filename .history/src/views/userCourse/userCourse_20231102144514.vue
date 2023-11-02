<template>
  <van-config-provider :theme-vars="themeVars">
    <van-pull-refresh v-model="reLoad" @refresh="refresh">
      <div ref="header">
        <van-nav-bar @click-right="openEvaluations">
          <template #title
            ><span style="color: #e1562a">我的课程</span></template
          >
          <template #right>
            <van-icon
              v-if="!userStore.EvaluationsCnt"
              name="chat-o"
              size="28"
            />
            <van-icon
              v-else
              name="chat-o"
              size="28"
              :badge="userStore.EvaluationsCnt"
            />
          </template>
        </van-nav-bar>
        <van-dropdown-menu active-color="#e1562a">
          <van-dropdown-item v-model="state" :options="option" />
        </van-dropdown-menu>
      </div>
      <course-page-skeleton :skeLoad="listLoading" v-if="listLoading" />
      <div class="container" v-else>
        <div
          class="list"
          :style="{
            height: `calc(100vh - ${headerHeight}px - var(--van-tabbar-height))`,
          }"
        >
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
      </div>
    </van-pull-refresh>
  </van-config-provider>
</template>

<script setup name="userCourse">
import { getCourses } from "@/api/courses/courses";
import CoursePreview from "@/components/coursePreview/coursePreview.vue";
import CoursePageSkeleton from "@/components/coursePageSkeleton/coursePageSkeleton.vue";
import { useUserStore } from "@/store/modules/user/index";
import { ref, reactive, onMounted } from "vue";
import { listProps } from "vant";
const userStore = useUserStore();
const themeVars = reactive({
  navBarTextColor: "#e1562a",
  navBarIconColor: "#e1562a",
});
const courseList = ref([]);
const header = ref();
const headerHeight = ref(0);
const router = useRouter();
const state = ref(null);
const pageNUm = ref(1);
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
  (async () => {
    getCourses({
      userType: 1,
      pageSize: 10,
      state: state.value,
    })
      .then((res) => {
        const { data, total } = res.data;
        courseList.value = list;
      })
      .finally(() => {
        loading.value = true;
        finished.value = true;
      });
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
      finished.value = true;
      listLoading.value = false;
    });
};
onLoad();
const onClickLeft = () => {
  router.back();
};
const openEvaluations = () => {
  router.push({ path: "/evalutions" });
};

onMounted(() => {
  headerHeight.value = header.value.offsetHeight;
});
</script>

<style scoped lang="less">
.course-list {
  overflow-y: auto;
}

.container {
  padding: 10px 20px 20px 20px;
  background-color: #f5f6f8;

  .list {
    overflow-y: auto;
  }

  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>
