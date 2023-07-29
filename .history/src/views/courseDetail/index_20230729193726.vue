<template>
  <div class="details">
    <div class="details-top">
      <div class="back-btn">
        <img @click="backBtn" src="../../assets/imgs/left-icon.png" alt="" />
      </div>
      <h1>{{ detailsObj.title }}</h1>
    </div>

    <div class="img-box">
      <img src="../../assets/imgs/Illustration.png" alt="" />
    </div>
    <div class="label">
      <span>{{ detailsObj.scoringStandards }}</span>
    </div>

    <div class="info">
      <div>
        <h3>课程信息</h3>
        <span>{{ detailsObj.pointsRules }}</span>
      </div>
      <div>
        <h3>地点</h3>
        <span>{{ detailsObj.courseLocation }}</span>
      </div>
    </div>
    <div class="application">
      <van-button :disabled="isSignUp" @click="RegisterNowBtn" class="application-btn"
        color="linear-gradient(to right, #ff6034, #ee0a24)">
        立即报名
      </van-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import rq from "@/api/courses/courses";
import { showToast } from "vant";
const router = useRouter();
const route = useRoute();
const courseId = ref(Number(route.query.courseId));
const isSignUp = computed(() => {
  return JSON.parse(route.query.isSignUp);
});

const detailsObj = ref({});
const getDetails = () => {
  rq.getCourseDetail(courseId.value).then((res: any) => {
    if (res.code === 200) {
      console.log(res.data);
      detailsObj.value = res.data;
    }
  });
};
getDetails();
const RegisterNowBtn = () => {
  rq.joinCourse(courseId.value).then((res: any) => {
    if (res.code == 200) {
      showToast("报名成功");
      setTimeout(() => {
        router.go(-1);
      }, 1500);
    } else {
      showToast("遇到错误, 报名失败");
    }
  });
};
const backBtn = () => {
  router.go(-1);
};
</script>

<style lang="less" scoped>
.details {
  padding: 3vh 3vw;

  .application {
    position: fixed;
    bottom: 3vh;
    left: 50%;
    transform: translateX(-50%);

    .application-btn {
      width: 70vw;
      border-radius: 1rem;
    }
  }

  .img-box {
    margin: 0 auto;
    margin-top: 1.25rem;

    img {
      width: 23.4375rem;
      height: 16.0625rem;
    }
  }

  .info {
    text-align: left;

    >div {
      margin-bottom: 1.375rem;

      h3 {
        font-family: Gen Jyuu Gothic;
        font-size: 1.5rem;
        font-weight: 100;
        color: #3c3a36;
        margin: 0;
      }

      p {
        font-family: Gen Jyuu Gothic Monospace;
        font-size: 0.875rem;
        font-weight: 200;
        line-height: 1.3125rem;

        color: #3c3a36;
      }
    }
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: end;
    margin: 2rem 0;

    span {
      height: 1.5rem;
      font-size: 0.875rem;
      background: #65aaea;
      padding: 0.25rem 1rem;
      border-radius: 0.75rem;
      color: #f2f2f2;
    }
  }

  .details-top {
    display: flex;
    align-items: center;

    .back-btn {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      border: 0.0625rem solid #bebab3;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h1 {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-family: Gen Jyuu Gothic;
      font-size: 1.5rem;

      font-weight: normal;
      color: #3c3a36;
    }
  }
}</style>