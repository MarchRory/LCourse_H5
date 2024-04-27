<script setup lang="ts">
import { useRoute } from "vue-router";
import { showFailToast, showNotify, showSuccessToast } from "vant";
import { defineAsyncComponent } from "vue";
import {addFlagApi} from '@/api/user/user'
import { commentToCourse  } from "@/api/courses/courses";
import type {commentToCourseObj} from '@/api/types/courses/index'
import {deepClone} from '@/utils/dataUtil/common'
import { debounce } from "@/utils/freqCtrl/freqCtrl";
import {starScoreTextMap} from './config'
import resPic from "@/assets/imgs/commentRes.gif";
const DimensionCommand = defineAsyncComponent(() => import('./components/dimensionCommand.vue'))
const backBtn = defineAsyncComponent(
  () => import("@/components/backButton/backButton.vue")
);
const route = useRoute();
const courseId = ref(Number(route.query.courseId));
const isCommentSuccess = ref(false);

const form = ref<commentToCourseObj>({
  score: 0,
  courseId: courseId.value,
  evaluateText: '',
  anonymous: false,
  detailCommand: [],
})
const flag_content = ref('')
// 同步维度评价结果
const handleDimensionCommandChange = (detail: commentToCourseObj['detailCommand']) => {
  const data = deepClone<typeof detail>(detail)
  data.forEach((item) => {
    if (Object.hasOwnProperty.call(data, 'description')) {
      delete item.description
    }
  })
  form.value.detailCommand = data
}
const submit = debounce(() => {
  if (!form.value.score) {
    showFailToast("先给课程打个分吧");
    return;
  }

  commentToCourse(form.value)
  .then(({success}) => {
    if (success) {
      showSuccessToast('评价成功')
      isCommentSuccess.value = true
    }else {
      showFailToast('请稍后重试')
    }
  }).catch((e) => {
    showFailToast(e)
  })
  
  flag_content.value && addFlagApi(flag_content.value)
  .then(({success}) => {
    if(!success) {
      showNotify({
        type: 'danger',
        message: '服务器异常, 立Flag失败',
        duration: 2 * 1000
      })
    }
  }).catch(() => {
    showNotify({
      type: 'danger',
      message: '网络异常, 立Flag失败, 请稍后再试',
      duration: 2 * 1000
    })
  })
}, 500);

</script>

<template>
  <div class="container">
    <van-sticky :offset-top="0">
      <header>
        <back-btn />
        <div class="title">评价</div>
        <div class="seat">
          <van-switch v-model="form.anonymous" :size="20" active-color="#ffac40"/>
          <span>匿名</span>
        </div>
      </header>
    </van-sticky>

    <div class="main" v-if="!isCommentSuccess">
      <section class="score firstSection">
        <span class="form-title">课程评分</span>
        <div class="scoreArea">
          <div>
            <van-rate
              v-model="form.score"
              :size="35"
              color="#ffae0d"
              void-color="#eee"
            />
          </div>
          <div class="scoreText">{{ starScoreTextMap[form.score].text }}</div>
        </div>
      </section>
      <section class="dimensionCommand">
        <span class="form-title">详细评价</span>
        <div class="content-area">
          <!--@vue-ignore-->
          <DimensionCommand :course-id="courseId" @on-change="handleDimensionCommandChange" />
        </div>
      </section>
      <section class="suggestion">
        <span class="form-title">吐槽与建议</span>
        <div class="content-area">
          <van-field
            v-model="form.evaluateText"
            rows="1"
            autosize
            type="textarea"
            placeholder="说说你对这门课程有哪些想吐槽的地方? 这门课程还需要怎么改进?"
            label-align="top"
          />
        </div>
      </section>
      <section class="flag">
        <span class="form-title">立个Flag</span>
        <div class="content-area">
          <van-field
            v-model="flag_content"
            rows="1"
            autosize
            type="textarea"
            placeholder="给自己立个Flag, 可以获得少量积分, 完成Flag后可获得更多积分"
            label-align="top"
          />
        </div>
      </section>
      <div
        :style="{
          backgroundColor: form.score !== 0 ? '#ffac40' : '#ffd9a9'
        }"
         class="submitBtn" 
        @click="submit"
      >
        发布评价
      </div>
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
  background-color: #F4F5F5;
  header {
    height: 120px;
    width: calc(100vw - 40px);
    display: flex;
    padding-left: 25px;
    padding-right: 25px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #ffff;

    .title {
      width: calc((100vw - 40px) / 2);
      font-family: Gen Jyuu Gothic;
      font-size: 42px;
      font-weight: 500;
      line-height: 32px;
      text-align: center;
      letter-spacing: 5px;
      background-color: #ffff;
    }

    .seat {
      height: 100%;
      width: 100px;
      background-color: #ffff;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      span {
        margin-top: 5px;
        font-size: 0.8em;
        font-weight: 700;
        color: gray;
      }
    }
  }

  .main {
    width: 100%;
    flex: 1;
    height: max-content;
    overflow-y: auto;
    section {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 6px;
      padding: 40px 30px ;
      background-color: #ffff;
      .content-area {
        width: 100%;
        :deep(textarea) {
          display: flex;
          align-items: flex-start;
          width: 94%;
          text-indent: 2.2em;
          margin: 0 auto;
          min-height: 200px;
          height: auto;
          word-wrap: break-word;
          word-break: break-word;
        }
      }
      .form-title {
        font-size: 1.1em;
        font-weight: 500;
        color: #242A33;
        font-family: PingFangSC-Medium;
      }
      div {
        padding: 10px 0;
      }
    }
    .firstSection {
      padding-top: 30px;
    }
    .score {
      .scoreArea {
        padding: 25px 0;
        margin: 0 auto;
        .scoreText {
          height: 1.1em;;
          color: #B8B8B8;
          margin-top: 20px;
          font-size: 1.1em;
          font-weight: 400;
        }
      }
    }
    .dimensionCommand {

    }
    .suggestion {

    }
    .flag {
      &::after {
        display: block;
        content: '';
        position: relative;
        width: 100%;
        height: 200px;
      }
    }

    .submitBtn {
      display: block;
      position: fixed;
      width: fit-content;
      padding: 20px 120px;
      border-radius: 20px;
      font-weight: 600;
      color: rgb(255, 255, 255);
      font-size: 1em;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%)
    }

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
