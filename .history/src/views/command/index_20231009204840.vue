<script setup lang="ts">
import { useRoute } from "vue-router";
import { showFailToast } from "vant";
import { defineAsyncComponent } from "vue";
import rq from "@/api/courses/courses";
import { showSuccessToast } from "vant";
import { debounce } from "@/utils/freqCtrl/freqCtrl";
import resPic from "@/assets/imgs/commentRes.gif";
const backBtn = defineAsyncComponent(
  () => import("@/components/backButton/backButton.vue")
);
const route = useRoute();
const title = ref(route.query.title);
const courseId = ref(Number(route.query.courseId));
const evaluateText = ref("");
const selfComment = ref("");
const score = ref(0);
const anonymous = ref(false);
const handleSwitchChange = (value: boolean) => {
  anonymous.value = value;
};
const isCommentSuccess = ref(false);

const submit = debounce(() => {
  if (!score.value) {
    showFailToast("先给课程打个分吧");
  } else if (!selfComment.value) {
    showFailToast("你还没有填写自我评价哦");
    return;
  } else if (!evaluateText.value) {
    showFailToast("你还没有填写课程评价哦");
    return;
  }
  Promise.all([
    rq.commentToCourse({
      score: score.value,
      courseId: courseId.value,
      evaluateText: evaluateText.value,
      anonymous: anonymous.value,
    }),
    rq.commentToSelf({
      score: score.value,
      courseId: courseId.value,
      evaluateText: selfComment.value,
    }),
  ]).then((res: any) => {
    if (res[0].code == 200 && res[1].code == 200) {
      showSuccessToast("课程评价成功");
      isCommentSuccess.value = true;
    } else {
      let message = res[0].code != 200 ? "课程" : "自我";
      showFailToast("遇到错误, " + message + "评价失败");
    }
  });
}, 300);
</script>

<template>
  <div class="container">
    <van-sticky :offset-top="0">
      <header>
        <back-btn />
        <div class="title">{{ title }}</div>
        <div class="seat"></div>
      </header>
    </van-sticky>

    <div class="main" v-if="!isCommentSuccess">
      <div class="commentevaluateText">
        <div class="commmentToSelf">
          <div style="text-align: left; margin-left: 20px">课程评分</div>
          <van-rate
            style="margin-bottom: 50px"
            v-model="score"
            :size="25"
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
            allow-half
          />
        </div>
        <div style="text-align: left; margin-left: 20px">自我评价</div>
        <van-cell-group inset style="margin-bottom: 20px">
          <van-field
            v-model="selfComment"
            rows="4"
            autosize
            maxlength="200"
            type="textarea"
            show-word-limit
            placeholder="通过这次课程, 我有这些收获...."
          />
        </van-cell-group>
        <div style="text-align: left; margin-left: 20px">课程评价</div>
        <van-cell-group inset>
          <van-field
            v-model="evaluateText"
            rows="4"
            autosize
            maxlength="200"
            type="textarea"
            show-word-limit
            placeholder="我觉得这个课程..."
          />
        </van-cell-group>
        <div class="anonymous">
          <van-switch
            v-model="anonymous"
            @change="handleSwitchChange"
            size="22px"
            active-color="#E3562A"
            inactive-color="#dcdee0"
          />
          <div style="margin-left: 10px">匿名评价</div>
        </div>
      </div>

      <van-button type="warning" size="large" @click="submit"
        >发布评价</van-button
      >
    </div>

    <div class="res" v-else>
      <van-image
        width="375"
        height="253"
        fit="scale-down"
        lazy-load
        :src="resPic"
      />
      <div class="resText">
        <div style="font-size: 30px; font-weight: 300; color: #9e9e9e">
          感<span class="speFont">谢</span>你的宝<span class="speFont">贵</span
          >意<span class="speFont">见</span>
        </div>
        <div style="color: #9e9e9e">您的任何意见</div>
        <div style="color: #9e9e9e">都是二课不断优化的动力</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  overflow-x: hidden;

  div {
    margin-bottom: 20px;
  }

  header {
    height: 140px;
    width: calc(100vw - 40px);
    display: flex;
    padding-left: 25px;
    padding-right: 25px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .title {
      width: calc((100vw - 40px) / 2);
      font-family: Gen Jyuu Gothic;
      font-size: 42px;
      font-weight: 500;
      line-height: 32px;
      text-align: center;
      letter-spacing: 5px;
    }

    .seat {
      height: 100%;
      width: 100px;
    }
  }

  .main {
    width: 90%;

    :deep(.van-image__img) {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      border: 1px solid #b8b8b8;
      margin-bottom: 20px;
    }

    :deep(.van-cell-group--inset) {
      border: 1px solid #afafaf;
    }

    :deep(.van-image--round) {
      border: 10px solid #c0e2ff;
    }

    :deep(.van-switch) {
      display: flex;
      align-items: center;
      font-size: 22px;
      height: 20px;
      background-color: rgb(91, 160, 146);
      width: 70px;

      .van-switch__node {
        top: -12px;
        left: 0;
        background: #e3562a;
        width: 30px;
        height: 30px;
        border: 6px solid #f8f2ee;
      }
    }

    .commentsevaluateText {
      margin-bottom: 10px;
    }

    .anonymous {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      left: 68%;
    }
  }

  .res {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .speFont {
      color: black;
      font-weight: 500;
    }
  }

  :deep(.van-button--warning) {
    border-radius: 16px;
    width: 92%;
  }
}
</style>
