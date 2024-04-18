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
    onEnter(el, done) {
      gsap.to(el, {
        duration: 0.25,
        delay: el.dataset.index * 0.25,
        keyframes: {
          "0%": {
            xPercent: -10,
            opacity: 0,
          },
          "100%": {
            xPercent: 0,
            opacity: 1,
          },
        },
        onComplete: done,
      });
    },
    onLeave(el, done) {
      gsap.to(el, {
        delay: el.dataset.index * 0.15,
        keyframes: {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
        onComplete: done,
      });
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
        :css="false"
        @enter="onEnter"
        @leave="onLeave"
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
        :css="false"
        @enter="onEnter"
        @leave="onLeave"
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
      <!--       <van-list
        v-else
        v-model:loading="loadStatus.loading"
        :finished="loadStatus.finished"
        v-model:error="loadStatus.error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="loadList"
      >
        <TransitionGroup :css="false" @enter="onEnter" @leave="onLeave" tag="van-list">
          <van-cell
            v-for="(course, index) in coursesList"
            :key="index"
            :data-index="index"
            @click="openDetail(course.id)"
          >
            <course-preview :course="course"></course-preview>
          </van-cell>
        </TransitionGroup>
      </van-list> -->
    </div>
  </div>
</template>

<style scoped lang="less">
:deep(.van-ceil) {
  display: block;
}
</style>
