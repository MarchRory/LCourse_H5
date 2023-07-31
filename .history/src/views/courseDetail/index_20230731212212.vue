<template>
  <div class="details">
    <div class="details-top">
      <div class="back-btn">
        <img @click="backBtn" src="../../assets/imgs/left-icon.png" alt="" />
      </div>
      <h1>{{ detailsObj.title }}</h1>

      <div class="tools" @click="showCenter = true">
        <van-icon name="edit" size="25" />
      </div>
    </div>

    <div class="mainInfo">
      <div class="img-box">
        <img src="../../assets/imgs/Illustration.png" alt="" />
      </div>
      <div class="label">
        <span>限制{{ detailsObj.numberLimit }}人</span>
        <span>{{ detailsObj.pointsRules }}</span>
        <span>{{ detailsObj.courseCategory }}</span>
      </div>
      <div class="label">
        <span>{{ detailsObj.semester }}</span>
        <span>{{ detailsObj.scoringStandards }}</span>
      </div>

      <div class="info">
        <div class="time">
          <span class="point">报名时间</span>
          <span class="timeRange">{{ detailsObj.applicationStart }} 至 {{ detailsObj.applicationEnd }}</span>
        </div>
        <div class="time">
          <span class="point">活动时间</span>
          <span class="timeRange">{{ detailsObj.hostingStart }} 至 {{ detailsObj.hostingEnd }}</span>
        </div>
        <div>
          <span class="point">主办方</span>
          <span>{{ detailsObj.organizer }}</span>
        </div>
        <div>
          <span class="point">承办方</span>
          <span>{{ detailsObj.undertaker }}</span>
        </div>
        <div>
          <span class="point">举办地点</span>
          <span>{{ detailsObj.courseLocation }}</span>
        </div>
        <div>
          <span class="point">活动介绍</span>
          <span>{{ detailsObj.introduction }}</span>
        </div>
        <div>
          <span class="point">联系方式</span>
          <span>{{ detailsObj.contact }}</span>
        </div>
        <div v-if="detailsObj.attachment">
          <span class="point">附件</span>
          <a :href="detailsObj.attachment" target="downloadFile" download>查看附件</a>
        </div>
      </div>
    </div>

    <div class="application">
      <van-button :disabled="Boolean(isSignUp)" @click="RegisterNowBtn" class="application-btn"
        color="linear-gradient(to right, #ff6034, #ee0a24)">
        立即报名
      </van-button>

      <div style="display: flex; flex-direction: column; align-items: center; color: rgba(252, 131, 26, 0.534);">
        <van-icon v-if="detailsObj.signUpstate != 3" name="smile-comment" size="30" @click="toComment"></van-icon>
        评价课程
      </div>
    </div>

    <van-popup v-model:show="showCenter" round :style="{ padding: 'px', overflow: 'hidden' }" :transition-appear="true"
      :close-on-click-overlay="false">
      <div class="signBox">
        <div class="signTitle">
          签到码签到
        </div>
        <div class="inputArea">
          <van-field v-model="signCode" size="large" type="text" label="签到码" />
        </div>
        <div class="tools">
          <div @click="close">取消</div>
          <div class="signUp" @click="sign">签到</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang='ts'>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import rq from "@/api/courses/courses";
import { showToast } from "vant";
import { showFailToast, showSuccessToast } from "vant/es";
const router = useRouter();
const route = useRoute();
const showCenter = ref(false)
const signCode = ref('')
const courseId = ref(Number(route.query.courseId));
const isSignUp = computed(() => {
  return Number(route.query.isSignUp);
});

const detailsObj: any = ref({});
const getDetails = () => {
  rq.getCourseDetail(courseId.value).then((res: any) => {
    if (res.code == 200) {
      const { data } = res
      detailsObj.value = data
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
const toComment = () => {
  router.push({ path: '/command', query: { couseId: Number(route.query.courseId), title: detailsObj.title } })
}

const sign = () => {
  if (!signCode.value) {
    showFailToast('还没有输入签到码哦')
    return;
  }
  rq.sign({
    courseId: Number(route.query.courseId),
    code: signCode.value
  }).then((res: any) => {
    if (res.code == 200) {
      if (res.code == 200) {
        showSuccessToast('签到成功')
        toComment()
      } else {
        showFailToast(res.message)
      }
    }
  })

}
const close = () => {
  signCode.value = ''
  showCenter.value = false
}
</script>

<style lang="less" scoped>
.details {
  padding: 2vh 4vw;

  .application {
    position: fixed;
    bottom: 20px;
    padding-right: 15px;
    width: calc(100% - 8vw);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 120px;

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

  .mainInfo {
    height: calc(100vh - 4vh - 4rem - 120px);
    overflow-y: auto;
  }

  .info {
    text-align: left;

    >div {
      margin-bottom: 1.375rem;
    }

    .time {
      font-family: Gen Jyuu Gothic;
      font-size: 30px;
      color: #5BA092;

      .timeRange {
        font-size: 23px;
        font-weight: 600;
      }
    }

    .point {
      font-family: Gen Jyuu Gothic;
      color: black;
      font-size: large;
      font-weight: bold;
      margin-right: 1rem;
    }

    p {
      font-family: Gen Jyuu Gothic Monospace;
      font-size: 0.875rem;
      font-weight: 200;
      line-height: 1.3125rem;

      color: #3c3a36;
    }
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
    height: 4rem;

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

    .tools {
      border-radius: 50%;
      position: relative;
      left: 74%;
      width: 90px;
      height: 90px;
      border: 2px solid #bebab3;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .signBox {
    width: 550px;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    .signTitle {
      font-size: 36px;
      font-weight: 600;
    }

    .inputArea {
      :deep(.van-field) {
        flex-wrap: wrap;
        border: 1px solid #f7a660;
        //padding: 20px 25px;
        width: 400px;
        border-radius: 10px;

        .van-field__label {
          width: 130px;
          border-right: 2px solid #efbf81;
        }

        #van-field-1-label {
          color: #f79823;
        }
      }
    }

    .tools {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      border-top: 2px solid rgb(243, 139, 60);
      overflow: hidden;
      position: relative;
      top: 60px;

      div {
        padding: 20px;
        width: 240px;
        font-weight: 600;
        letter-spacing: 5px;
        font-size: 35px;
      }

      .signUp {
        color: white;
        background-color: #fba665;
      }
    }
  }
}
</style>