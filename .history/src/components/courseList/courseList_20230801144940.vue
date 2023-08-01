<script lang="ts">
import CoursePageSkeleton from "@/components/coursePageSkeleton/coursePageSkeleton.vue";
//import CoursePreview from "@/components/coursePreview/coursePreview.vue";
import { toRefs, defineAsyncComponent } from "vue";
import rqCourse from "../../api/courses/courses";
import router from "@/router";
import { useUserStore } from "@/store/modules/user";
const coursePreview = defineAsyncComponent(
  () => import("@/components/coursePreview/coursePreview.vue")
)
export default {
  components: { CoursePageSkeleton, coursePreview },
  props: {
    category: {
      tyep: String,
      default: null,
      required: true,
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
  },
  setup(props) {
    const { category } = toRefs(props);
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
        this.selectParams,
      );
      this.loadStatus.loading = true;
      this.loadStatus.finished = false;
      rqCourse
        .getCourses(params)
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
            if (this.coursesList.length === this.total) {
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
  },
};

// 组件对外发送事件
/* type Emits = {
} */
</script>

<template>
  <div>
    <div class="list">
      <van-list v-model:loading="loadStatus.loading" :finished="loadStatus.finished" v-model:error="loadStatus.error"
        error-text="请求失败，点击重新加载" finished-text="没有更多了" @load="loadList">
        <van-cell v-for="(course, index) in coursesList" :key="index" @click="openDetail(course.id)">
          <course-preview :course="course"></course-preview>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<style scoped lang="less">
.course {
  width: 690px;
  height: 600px;
  border-radius: 10px;
  margin-top: 18px;
  border: 1px solid black;
  overflow: hidden;

  .category {
    position: absolute;
    padding: 3px 20px;
    border-radius: 27px;
    background-color: #65aaea;
    color: white;
    left: 61%;
    top: 60%;
  }

  .timeRange,
  .title,
  .introduce {
    text-align: left;
    margin-left: 20px;
    margin-bottom: 13px;
  }

  .timeRange {
    color: #5ba092;
  }

  .title {
    font-size: 48px;
    font-family: Gen Jyuu Gothic;
    line-height: 32px;
    color: rgb(121, 121, 121);
  }

  .introduce {
    font-weight: 300;
  }
}
</style>
