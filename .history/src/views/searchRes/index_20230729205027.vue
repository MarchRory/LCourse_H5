<template>
  <div class="results">
    <van-sticky :offset-top="0">
      <div class="results-top">
        <div class="back-btn">
          <img @click="backBtn" src="../../assets/imgs/left-icon.png" alt="" />
        </div>
        <div class="search-box">
          <input v-model="searchVal" class="search-ipt" type="text" placeholder="输入课程名关键词查询课程" />
          <img @click="searchBtn" class="search-icon" src="../../assets/imgs/Search-Icon.png" alt="" />
        </div>
      </div>
    </van-sticky>

    <div v-if="isFound" class="results-content">
      <div class="title">
        <span>{{ resultsArr.length }}</span>
        <span>个搜索结果</span>
      </div>
      <ul class="results-list">
        <li @click="toDetailsBnt(v.id, v.isSignUp)" class="list-item" v-for="(v, i) in resultsArr" :key="i">
          <div class="item-top">
            <img class="item-img" :src="v.cover || defaultCover" alt="" />
            <div class="item-top-label">{{ v.pointsRules }}</div>
          </div>
          <div class="item-bottom">
            <p class="time">
              <span>{{ v.hostingStart }}</span>到<span>{{ v.hostingEnd }}</span>
            </p>
            <h3>{{ v.title }}</h3>
            <p class="text">{{ v.courseCategory }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="not-found">
      <img class="not-found-img" src="../../assets/imgs/Cool-Kids-Standing.png" alt="" />
      <div v-show="isSearch">
        <h3>课程没有找到呢</h3>
        <p>尝试一下别的关键词吧</p>
      </div>
      <div class="tips" v-show="!isSearch">请输入关键字</div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from "vue";
import rq from "@/api/courses/courses";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";
var pageNum = ref(0)
const userStore = useUserStore()
const searchVal = ref(""); //搜索框绑定值
const isFound = ref(false); //是否搜索到状态
const defaultCover = () => {
  return new URL('@/assets/imgs/Cool-Kids-Discussion.png').href
}
const isSearch = ref(false); //是否搜索
let resultsArr: any = ref([]); //搜索结果数组
const router = useRouter();
//返回上一个路由
const backBtn = () => {
  router.go(-1);
};
//跳转详情
const toDetailsBnt = (courseId: number, isSignUp: number) => {
  router.push({
    path: "/detail",
    query: { courseId: JSON.stringify(courseId), isSignUp },
  });
};

//搜索函数
const searchBtn = () => {
  if (searchVal.value != "") {
    rq.getCourses({
      title: searchVal.value,
      pageNum: pageNum.value,
      semesterId: userStore.semesterId,
      pageSize: 15,
      state: 0,
      reviewed: 0
    }).then((res: any) => {
      if (res.code === 200) {
        if (res.data.list.length < 1) {
          isFound.value = false;
          isSearch.value = true;
          searchVal.value = "";
        } else {
          res.data.list.forEach((item: any) => {
            resultsArr.value.push(item)
          })
          if (res.data.total != resultsArr.length) {
            pageNum.value++
          }
          isFound.value = true;
        }
      }
    });
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.loading-icon {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.results {
  padding: 3vh 3vw;

  .not-found {
    padding-top: 1.9375rem;

    .not-found-img {
      width: 23.4375rem;
      height: 15.8125rem;
    }

    h3 {
      font-family: Gen Jyuu Gothic;
      font-size: 1.5rem;
      color: #3c3a36;
      font-weight: 100;
      line-height: 2rem;
      margin: 2rem 0 0.5rem 0;
    }

    p {
      font-family: Gen Jyuu Gothic Monospace;
      font-size: 0.875rem;
      font-weight: 200;
      line-height: 1.3125rem;
      color: #78746d;
    }

    .tips {
      margin-top: 1.25rem;
      font-family: Gen Jyuu Gothic Monospace;
      font-size: 1rem;
      font-weight: 200;
      line-height: 1.3125rem;
      color: #78746d;
    }
  }

  .results-content {
    .title {
      text-align: left;
      font-family: Gen Jyuu Gothic;
      font-size: 1.5rem;
      font-weight: 100;
      line-height: 2rem;
      color: #3c3a36;
      margin: 0.75rem 0 1.5625rem 0;

      span {
        margin-right: 0.3125rem;
      }
    }
  }

  .results-list {
    .list-item {
      border: 0.0625rem solid #ccc;
      border-radius: 0.5rem;
      margin-bottom: 1rem;

      .item-top {
        height: 12.125rem;
        position: relative;
        background: #f8f2ee;
        padding: 1rem 0;

        .item-img {
          width: 100%;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }

        .item-top-label {
          right: 1rem;
          bottom: 0.5rem;
          position: absolute;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: 0.25rem 1rem;
          background: #65aaea;
          border-radius: 0.75rem;
          color: #f2f2f2;
          height: 1.5rem;
          font-size: 0.875rem;
        }
      }

      .item-bottom {
        text-align: left;
        padding: 1rem;

        .time {
          font-family: Gen Jyuu Gothic;
          font-size: 0.75rem;
          color: #5ba092;
        }

        h3 {
          font-family: Gen Jyuu Gothic;
          font-size: 1.5rem;
          color: #3c3a36;
          font-weight: 100;
          line-height: 2rem;
          margin: 0.25rem 0;
        }

        .text {
          font-family: Gen Jyuu Gothic Monospace;
          font-size: 0.875rem;
          font-weight: 200;
          color: #3c3a36;
        }
      }
    }
  }

  .results-top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .back-btn {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      border: 0.0625rem solid #bebab3;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .search-box {
      margin-left: 0.5rem;
      flex: 1;
      position: relative;

      .search-ipt {
        width: 100%;
        padding-left: 1rem;
        height: 3.5rem;
        border: 0.0625rem solid #bebab3;
        border-radius: 0.75rem;
      }

      .search-icon {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>