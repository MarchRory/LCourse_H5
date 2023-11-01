<script lang="ts" setup>
import {
  ref,
  defineProps,
  defineEmits,
  defineAsyncComponent,
  onMounted,
} from "vue";
import {
  commentTemplate,
  commentTemplateResultModel,
  templateListParamsType,
  vocabularyType,
} from "../../api/types/comment";
import { getCommentTemplateAPI } from "@/api/courses/courses";
import { Response } from "@/utils/http/types";
import { showFailToast } from "vant";

const props = defineProps<{
  level: number;
}>();
const emits = defineEmits<{
  (e: "onChange", chosenTextObj: any): void;
}>();
const context = ref<HTMLDivElement>();
const TemplateItemInList = defineAsyncComponent(
  () => import("./components/templateItemInList.vue")
);
const VocabularyList = defineAsyncComponent(
  () => import("./components/vocabularyList.vue")
);
const selfCommentTemplateList = ref<commentTemplate[]>([] as commentTemplate[]);
const selfCommentTemplateTotal = ref<number>(0);
const commentTemplateListParams = ref<templateListParamsType>({
  page: 1,
  pageSize: 10,
  level: 0,
  type: 0,
  key: "",
});
const templateLoading = ref(false);
const templateListFinished = ref(false);
const isOpenTemplateList = ref(false);
const isOpenVocabularyList = ref(false);
const templateTextCopy = ref<any>();
const insertedDOM = ref<HTMLInputElement>();
const vocabularyParams = ref<{ typeId: number; partOfSpeech: number }>();
const vocabulary = ref<any>();
function insertText(
  e: Event,
  params: { typeId: number; partOfSpeech: number }
) {
  if (!isOpenTemplateList.value) {
    insertedDOM.value = e.target as HTMLInputElement;
    const p = {
      typeId: params.typeId,
      partOfSpeech: params.partOfSpeech,
    };
    vocabularyParams.value = p;
    isOpenVocabularyList.value = true;
  }
}
function handleInsertWord(wordObj: any) {
  insertedDOM.value!.value = wordObj.text;
  isOpenVocabularyList.value = false;
  emits("onChange", { evaluateText: context.value?.innerHTML });
}
function handleClosePopup() {
  isOpenVocabularyList.value = false;
}
const loadSelfCommentTemplateList = () => {
  if (templateListFinished.value) {
    templateLoading.value = false;
    return;
  }
  templateLoading.value = true;
  getCommentTemplateAPI(commentTemplateListParams.value)
    .then((res: Response<commentTemplateResultModel>) => {
      const { list, total } = res.data;
      list.forEach((item: commentTemplate) => {
        selfCommentTemplateList.value.push(item);
      });
      selfCommentTemplateTotal.value = total;
      templateListFinished.value =
        selfCommentTemplateList.value.length >= selfCommentTemplateTotal.value;
    })
    .finally(() => {
      templateLoading.value = false;
    });
};
const beginComment = async () => {
  if (!props.level) {
    showFailToast("先打分再进行操作吧");
    return;
  }
  if (!selfCommentTemplateList.value.length) {
    loadSelfCommentTemplateList();
  }
  isOpenTemplateList.value = true;
};
function handleChooseTemplate(templateIndex: number) {
  console.log(templateIndex);
  templateTextCopy.value =
    selfCommentTemplateList.value[templateIndex].templateText;
  isOpenTemplateList.value = false;
}
watch(
  () => props.level,
  (newVal: number) => {
    templateTextCopy.value = "";
    commentTemplateListParams.value.level = newVal * 2;
    selfCommentTemplateList.value = [];
    selfCommentTemplateTotal.value = 0;
    templateLoading.value = false;
    templateListFinished.value = false;
  }
);

onMounted(() => {
  Window.prototype.insertText = insertText;
});
</script>

<template>
  <div>
    <ul @click="beginComment">
      <li><van-icon name="replay" size="20" /></li>
      <li style="margin-left: 5px">选择</li>
    </ul>
    <div class="commenArea">
      {{ selfCommentTemplateTotal }}
      <span v-if="templateTextCopy == ''" class="notice"
        >打分后点击选择使用对应分数模板</span
      >
      <div v-else>
        666
        <div
          ref="context"
          style="text-indent: 2em; text-align: left"
          v-html="templateTextCopy"
        ></div>
      </div>
    </div>
    <van-popup
      v-model:show="isOpenTemplateList"
      closeable
      safe-area-inset-top
      position="right"
      :style="{ width: '75%', height: '100%' }"
    >
      <span class="popupTitle">自我评价模板</span>
      <div class="templateListBox">
        <van-list
          v-model:loading="templateLoading"
          :finished="templateListFinished"
          finished-text="没有更多模板了"
          @load="loadSelfCommentTemplateList"
        >
          <van-cell
            v-for="(template, index) in selfCommentTemplateList"
            :key="index"
          >
            <TemplateItemInList
              :templateCommentText="template"
              :index="index"
              @onChoose="handleChooseTemplate"
            />
          </van-cell>
        </van-list>
      </div>
    </van-popup>

    <van-popup
      v-model:show="isOpenVocabularyList"
      position="bottom"
      round
      :style="{ height: '50%' }"
    >
      <keep-alive>
        <VocabularyList
          :second-params="{
            level: commentTemplateListParams.level,
            ...vocabularyParams,
          }"
          @onChange="handleInsertWord"
          @onClose="handleClosePopup"
        />
      </keep-alive>
    </van-popup>
  </div>
</template>

<style scoped lang="less">
.commenArea {
  width: 90%;
  height: 300px;
  padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
  border-radius: 10px;
  overflow-y: auto;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  top: 15px;
  left: 32%;
  font-size: 1rem;
  margin-bottom: 15px;
  color: #e3631b;
  font-weight: bold;
  font-family: ui-sans-serif;
  li {
    display: inline-block;
  }
}
.notice {
  position: relative;
  top: 45%;
}
.templateListBox {
  margin-top: calc(2.5 * var(--van-popup-close-icon-size));
  height: calc(100% - var(--van-popup-close-icon-size) * 2.5);
  padding-bottom: 20px;
  overflow-y: scroll;
}
.popupTitle {
  position: absolute;
  top: calc(0.7 * var(--van-popup-close-icon-size));
  left: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  color: rgb(235 137 38);
}
:deep(.van-cell__value) {
  overflow: visible;
}
:deep(.van-cell) {
  transition: all 0.3s ease-in-out;
}
</style>
