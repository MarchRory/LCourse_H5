<template>
  <div>
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar title="我的课程" left-text="返回" left-arrow @click-left="onClickLeft">
      </van-nav-bar>
      <van-dropdown-menu title="课程状态" active-color="#e1562a">
        <van-dropdown-item v-model="state" :options="option" />
      </van-dropdown-menu>
  </div>

  <div class="container">
    <div class="course-list">
      <course-list category="" user-type="1" :state="state" />
    </div>
  </div>
</van-config-provider></template>

<script setup>
import CourseList from "@/components/courseList/courseList.vue";

const themeVars = reactive({
  navBarTextColor: "#e1562a",
  navBarIconColor: "#e1562a",
});
const router = useRouter();
const state = ref(0);
const option = [
  { text: "全部", value: 0 },
  { text: "报名中", value: 2 },
  { text: "进行中", value: 3 },
  { text: "已结束", value: 4 },
];
const onClickLeft = () => {
  router.back();
};
</script>

<style scoped>
.course-list {
  overflow-y: auto;
}

.container {
  padding: 20px;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>
