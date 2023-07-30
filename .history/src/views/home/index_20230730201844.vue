<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "@/store/modules/user/index";
import rqS from '@/api/semester/semester'
import { defineAsyncComponent } from "vue";
import router from "@/router/index";
const courseCategory = ref("");
// console.log(courseCategory)
const searchBar = defineAsyncComponent(() =>
  import("@/components/searchBar/searchBar.vue")
);
const courseList = defineAsyncComponent(() =>
  import("@/components/courseList/courseList.vue")
);
const userStore = useUserStore();
const keyWords = ref("");
const chosenTagIndex = ref(0);
const tags = reactive([
  {
    tag: "全部",
    key: "",
  },
  {
    tag: "日常劳动",
    key: "日常生活劳动",
  },
  {
    tag: "生产顶岗",
    key: "生产顶岗劳动",
  },
  {
    tag: "劳动理论",
    key: "劳动理论学习",
  },
  {
    tag: "其他劳动",
    key: "其他方式劳动",
  },
]);

onMounted(() => {
  rqS.getSemesterNow().then((res: any) => {
    if (res.code == 200) {
      userStore.setSemesterId(res.data.id)
    }
  })
})

const searchTag = (key: string, index: number) => {
  chosenTagIndex.value = index;
  courseCategory.value = key;
};

const search = () => { };
const toSearchBtn = () => {
  router.push({ path: "/searchRes" });
};

/* const scanQR = () => {
  router.push({ path: '/scan/scanQR' })
} */
</script>

<template>
  <div class="container">
    <van-sticky :offset-top="0">
      <div class="header">
        <div class="welcomeInfo">
          <div class="leftSide">
            <div style="text-align: left">
              <span style="color: #3c3a36; font-size: 16px">欢</span>
              <span style="color: rgb(163, 163, 163)">迎回来</span>
            </div>
            <div style="font-size: 28px; font-weight: 300">
              {{ userStore.name }}
            </div>
          </div>
          <div class="tools">
            <!-- <van-icon name="scan" size="25" @click="scanQR" /> -->
          </div>
        </div>
        <search-bar @click="toSearchBtn" :key-words="keyWords" @search-course="search"
          @update:key-words="keyWords = $event" />
        <div class="tag">
          <span style="
              font-weight: 300;
              line-height: 21px;
              font-size: 16px;
              width: 47px;
            ">分类:
          </span>
          <div class="tagListBox">
            <div class="tagList">
              <van-tag mark :color="chosenTagIndex == index ? '#E3562A' : '#65AAEA'" size="medium"
                v-for="(item, index) in tags" :key="index" @click="searchTag(item.key, index)">
                {{ item.tag }}
              </van-tag>
            </div>
          </div>
        </div>
      </div>
    </van-sticky>

    <div>
      <course-list :category="courseCategory" />
    </div>
  </div>
</template>


<style scoped lang="less">
.container {
  padding: 20px;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: white;
    position: sticky;

    .welcomeInfo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: @max-div-width;
      //width: calc(100% - 40px);
      margin-bottom: 10px;
    }

    .tools {
      border-radius: 50%;
      width: 90px;
      height: 90px;
      border: 2px solid #bebab3;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tag {
      display: flex;
      flex-direction: row;
      width: @max-div-width;
      margin-bottom: 10px;
      align-items: center;
      margin: 0 auto;

      .tagListBox {
        width: calc(@max-div-width - 47px);
        overflow-x: auto;

        .tagList {
          display: flex;
          flex-direction: row;
          align-items: center;

          :deep(.van-tag) {
            margin-left: 10px;
          }

          ::webkit-scrollbar {
            display: none;
          }
        }
      }
    }
  }
}
</style>