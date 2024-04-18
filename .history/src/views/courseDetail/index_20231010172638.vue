<template>
  <div>
    <course-ske :ske-load="skeLoad"></course-ske>
    <div class="details" v-if="!skeLoad">
      <div class="details-top">
        <div class="back-btn">
          <img @click="backBtn" src="../../assets/imgs/left-icon.png" alt="" />
        </div>
        <h1>{{ detailsObj.title }}</h1>

        <div
          v-if="detailsObj.signUpstate == 2"
          class="tools"
          @click="showCenter = true"
        >
          <div class="tools" @click="showCenter = true">
            <van-icon name="edit" size="30" />
          </div>
          <span>签到</span>
        </div>
      </div>

      <div class="mainInfo">
        <div class="img-box">
          <van-image
            width="100%"
            height="240"
            fit="cover"
            lazy-load
            :src="detailsObj.cover || defaultCover"
          />
        </div>
        <div class="label">
          <span>{{ detailsObj.courseCategory }}</span>
        </div>

        <div class="info">
          <div>
            <span class="point">举办学期</span>
            <strong style="font-size: 18px">{{ detailsObj.semester }}</strong>
          </div>
          <div class="time">
            <span class="point">报名时间</span>
            <span class="timeRange"
              >{{ detailsObj.applicationStart }} 至
              {{ detailsObj.applicationEnd }}</span
            >
          </div>
          <div class="time">
            <span class="point">活动时间</span>
            <span class="timeRange"
              >{{ detailsObj.hostingStart }} 至
              {{ detailsObj.hostingEnd }}</span
            >
          </div>
          <div>
            <span class="point">课程分类</span>
            <span>{{ detailsObj.courseCategory }}</span>
          </div>
          <div>
            <span class="point">主办单位</span>
            <span>{{ detailsObj.organizer }}</span>
          </div>
          <div>
            <span class="point">承办单位</span>
            <span>{{ detailsObj.undertaker }}</span>
          </div>
          <div>
            <span class="point">人数限制</span>
            <span style="font-size: 20px; font-weight: bold; color: #076a6a">{{
              detailsObj.numberLimit
            }}</span>
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
            <span class="point">加分规则</span>
            <span>{{ detailsObj.pointsRules }}</span>
          </div>
          <div>
            <div>
              <span class="point">课程群:</span>
              <span>{{ detailsObj.contact }}</span>
            </div>
            <div v-if="detailsObj.attachment">
              <span class="point">附件</span>
              <a :href="detailsObj.attachment" target="downloadFile" download
                >查看附件</a
              >
            </div>
          </div>
        </div>

        <div class="application">
          <van-button
            :disabled="btnState != 1"
            @click="RegisterNowBtn"
            class="application-btn"
            :color="btnColor[`${btnState === 1 ? 0 : 1}`]"
          >
            {{ btnContent }}
          </van-button>

          <div
            v-if="detailsObj.signUpstate == 3"
            @click="toComment"
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              color: rgba(252, 131, 26, 0.879);
              margin-top: 10px;
            "
          >
            <van-icon name="smile-comment" size="30"></van-icon>
            评价课程
          </div>
        </div>

        <van-popup
          v-model:show="showCenter"
          round
          :style="{ padding: 'px', overflow: 'hidden' }"
          :transition-appear="true"
          :close-on-click-overlay="false"
        >
          <div class="signBox">
            <div class="signTitle">签到码签到</div>
            <div class="inputArea">
              <van-field
                v-model="signCode"
                size="large"
                type="text"
                label="签到码"
              />
            </div>
            <div class="tools">
              <div @click="close">取消</div>
              <div class="signUp" @click="courseSign">签到</div>
            </div>
          </div>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, onActivated } from "vue";
import { useRouter, useRoute } from "vue-router";
import { debounce, throttle } from "@/utils/freqCtrl/freqCtrl";
import { showFailToast, showSuccessToast } from "vant/es";
import defaultCover from "@/assets/imgs/Illustration.png";
import { getCourseDetail, joinCourse, sign } from "@/api/courses/courses";
const router = useRouter();
const route = useRoute();
const showCenter = ref(false);
const signCode = ref("");
const skeLoad = ref(true);
const courseId = ref(Number(route.query.courseId));
const btnState = ref(0);
const btnContent = ref("");
const btnColor = ["linear-gradient(to right, #ff6034, #ee0a24)", "grey"];
const detailsObj: any = ref({});
const courseSke = defineAsyncComponent(
  () => import("@/components/coursePageSkeleton/coursePageSkeleton.vue")
);

const checkStaus = () => {
  // 按钮状态
  if (
    detailsObj.value.numberLimit == detailsObj.value.signUpCount &&
    detailsObj.value.signUpstate != 2 &&
    detailsObj.value.state == 2
  ) {
    btnState.value = 0;
    btnContent.value = "课程已满员";
  } else if (detailsObj.value.signUpstate === 0) {
    btnState.value = detailsObj.value.state !== 2 ? 0 : 1;
    btnContent.value =
      detailsObj.value.state !== 2 ? "当前无法报名" : "报名课程";
  } else if (detailsObj.value.signUpstate === -1) {
    // 报名被打回, 未通过审核
    btnState.value = 0;
    btnContent.value = "未通过审核";
  } else if (detailsObj.value.signUpstate === 1) {
    // 报名成功, 等待审核
    btnState.value = 0;
    btnContent.value = "等待录取";
  } else if (detailsObj.value.signUpstate === 2) {
    // 通过报名
    btnState.value = 0;
    btnContent.value =
      detailsObj.value.state !== 3 ? "等待课程开始" : "等待签到";
  } else if (detailsObj.value.signUpstate === 3) {
    // 完成签到
    btnState.value = 0;
    btnContent.value = "还未填写评价";
  } else if (detailsObj.value.signUpstate === 4) {
    // 完成课程自评
    btnState.value = 0;
    btnContent.value = "等待老师考评";
  } else {
    // 完成自评且老师已经考评, 此时全部完成
    btnState.value = 0;
    btnContent.value = "课程已全部完成";
  }
};

const getDetails = () => {
  skeLoad.value = true;
  getCourseDetail(courseId.value)
    .then((res: any) => {
      if (res.code == 200) {
        const { data } = res;
        detailsObj.value = data;
      }
    })
    .then(() => {
      checkStaus();
    })
    .finally(() => {
      setTimeout(() => {
        skeLoad.value = false;
      }, 200);
    });
};
getDetails();

const RegisterNowBtn = debounce(() => {
  joinCourse(courseId.value).then((res: any) => {
    if (res.code == 200) {
      showSuccessToast("报名成功, 等待审核");
      setTimeout(() => {
        router.go(-1);
      }, 800);
    } else {
      showFailToast("遇到错误, 报名失败");
    }
  });
}, 500);

const backBtn = () => {
  router.go(-1);
};
const toComment = () => {
  router.push({ path: "/command", query: { courseId: detailsObj.value.id } });
};

const courseSign = throttle(() => {
  if (!signCode.value) {
    showFailToast("还没有输入签到码哦");
    return;
  }
  sign({
    courseId: Number(route.query.courseId),
    code: signCode.value,
  }).then((res: any) => {
    if (res.code == 200) {
      if (res.code == 200) {
        showSuccessToast("签到成功");
        toComment();
      } else {
        showFailToast(res.message);
      }
    }
  });
}, 500);

const close = () => {
  signCode.value = "";
  showCenter.value = false;
};

onActivated(() => {
  getDetails();
});
</script>

<style lang="less" scoped>
.details {
  padding: 10px 4vw;

  .application {
    position: fixed;
    bottom: 30px;
    padding-right: 15px;
    width: calc(100% - 8vw);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 90px;
    background-color: white;

    .application-btn {
      width: 70vw;
      border-radius: 1rem;
      color: white;
      margin-top: 10px;
    }
  }

  .img-box {
    margin: 0 auto;
    margin-top: 1.25rem;
  }

  .mainInfo {
    height: calc(100vh - 4vh - 4rem - 70px);
    overflow-y: auto;
  }

  .info {
    text-align: left;

    > div {
      margin-bottom: 1.375rem;
    }

    .time {
      font-family: Gen Jyuu Gothic;
      font-size: 30px;
      color: #5ba092;

      .timeRange {
        font-size: 22px;
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
    justify-content: space-between;
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

    .signBox {
      position: relative;
      bottom: 25px;
      left: 73%;
      height: 220px;
      width: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      .tools {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      span {
        font-size: 24px;
        font-weight: bold;
      }
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
