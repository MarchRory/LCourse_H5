<script lang="ts">
import CoursePageSkeleton from "@/components/coursePageSkeleton/coursePageSkeleton.vue";
import { toRefs, defineAsyncComponent } from "vue";
import router from "@/router";
import { useUserStore } from "@/store/modules/user";
import { getCourses } from "@/api/courses/courses";
import { gsap } from "gsap";
const coursePreview = defineAsyncComponent(
  () => import("@/components/coursePreview/coursePreview.vue")
);
export default {
  components: { CoursePageSkeleton, coursePreview },
  props: {
    propList: {
      type: Array as any,
      default: null,
    },
    category: {
      tyep: String,
      default: "",
    },
    keywords: {
      type: String,
      default: "",
    },
    state: {
      type: Number,
      default: 2,
    },
    userType: {
      type: Number,
      default: 0,
    },
    isRefresh: {
      type: Boolean,
      defatult: false,
    },
  },
  setup(props) {
    const { category, propList, isRefresh } = toRefs(props);
    const userStore = useUserStore();
    const defaultCover = ref("");
    (async () => {
      let dc = await import("@/assets/imgs/Cool-Kids-Discussion.png");
      defaultCover.value = dc.default;
    })();

    return {
      category,
      userStore,
      defaultCover,
      propList,
      isRefresh,
    };
  },
  data() {
    return {
      skeleton: true,
      coursesList: [] as any,
      selectParams: {
        pageNum: 1,
        pageSize: 15,
      },
      loadStatus: {
        loading: false,
        error: false,
        finished: false,
      },
      total: 0,
      categorycopy: "" as any,
      transtionName: ["list-right-in"],
    };
  },
  methods: {
    loadList() {
      let params = Object.assign(
        {
          category: this.category,
          title: this.keywords,
          semesterId: this.userStore.semesterId,
          state: this.state,
          usertype: this.userType,
          reviewed: 0,
        },
        this.selectParams
      );
      this.loadStatus.loading = true;
      this.loadStatus.finished = false;
      getCourses(params)
        .then((res: any) => {
          if (res.code == 200) {
            const { data } = res;
            this.total = data.total;
            this.skeleton = false;
            if (this.categorycopy == this.category) {
              data.list.forEach((element: any) => {
                this.coursesList.push(element);
              });
            } else {
              this.coursesList = data.list;
              this.categorycopy = this.category;
            }
            if (this.coursesList.length >= this.total) {
              this.loadStatus.finished = true;
            } else {
              this.selectParams.pageNum++;
            }
          } else {
            this.loadStatus.error = true;
          }
        })
        .finally(() => {
          this.loadStatus.loading = false;
          if (this.isRefresh) {
            this.$emit("onRefreshEnd");
          }
        });
    },
    openDetail(courseId: number | string) {
      const query = { courseId: courseId };
      router.push({ path: "/detail", query });
    },
  },
  watch: {
    category: {
      handler(newVal, oldVal) {
        if (newVal || newVal == "") {
          this.categorycopy = oldVal;
          this.loadList();
        }
      },
      immediate: true,
    },
    keywords: {
      handler(newVal) {
        if (newVal || newVal == "") {
          this.coursesList = [];
          this.selectParams.pageNum = 1;
          this.loadList();
        }
      },
    },
    isRefresh: {
      handler(newVal) {
        if (newVal) {
          this.selectParams.pageNum = 1;
          this.total = 0;
          this.coursesList = [];
          this.loadStatus.finished = false;
          this.loadList();
        }
      },
    },
  },
  onMounted() {},
};

// 组件对外发送事件
/* type Emits = {
} */
</script>

<template>
  <div>
    <div class="list">
      <!-- 暂定, 后面用gsap加一个列表加载动画 -->
      <TransitionGroup
        tag="van-list"
        v-if="propList && propList.length"
        name="list-right-in"
      >
        <van-cell
          v-for="(course, index) in propList"
          :key="index"
          :data-index="index"
          @click="openDetail(course.id)"
        >
          <course-preview :course="course"></course-preview>
        </van-cell>
      </TransitionGroup>
      <TransitionGroup
        name="list-right-in"
        tag="van-list"
        v-else
        v-model:loading="loadStatus.loading"
        :finished="loadStatus.finished"
        v-model:error="loadStatus.error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="loadList"
      >
        <van-cell
          v-for="(course, index) in coursesList"
          :key="index"
          :data-index="index"
          @click="openDetail(course.id)"
        >
          <course-preview :course="course"></course-preview>
        </van-cell>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped lang="less">
:deep(.van-ceil) {
  display: block;
}
.list-right-in-enter-active {
  transition: all 0.6s ease;
}
.list-right-in-leave-active {
  transition: all 0.4s ease;
}
.list-right-in-enter-from {
  transform: scale(0);
  transform: translateX(50%);
  opacity: 0;
}
.list-right-in-enter-to {
  transform: scale(1);
  transform: translate(0);
  opacity: 1;
}

.list-right-in-leave-from {
  opacity: 1;
  transform: scale(1);
}
.list-right-in-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
