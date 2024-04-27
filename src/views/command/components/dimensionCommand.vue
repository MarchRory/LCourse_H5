<script setup lang="ts">
import { DimensionCommandContentItem} from '@/api/dimension';
import {commandDimensionList} from '../config'
import { debounce } from '@/utils/freqCtrl/freqCtrl';

const props = defineProps<{
    courseId: number;
}>()

const emits = defineEmits<{
    (e: 'onChange', value: DimensionCommandContentItem[]): void
}>()

// 评价维度tag列表
const dimensionList = ref(commandDimensionList.map(item => {
    return {
        ...item,
        chosen: item.id === 1,
    }
}))

// 用户评论s列表
const contentList = ref<DimensionCommandContentItem[]>([])

// 选择tag进行评价
const chooseTag = (chosenTag: typeof dimensionList.value[0]) => {
    chosenTag.chosen = true
    contentList.value.push({
        course_evaluate_top_id: chosenTag.id as number,
        course_evaluate_id: +props.courseId,
        name: chosenTag.name,
        text: '',
        icon: chosenTag.icon,
        description: chosenTag.description
    })
}

// 删除已经选择的tag
const delEditedDimension = (deleteItem: DimensionCommandContentItem, index: number) => {
    const {course_evaluate_top_id} = deleteItem

    // 删除编辑框里的维度
    contentList.value.splice(index, 1)

    // 回显维度选择器中的维度
    const dimensionIndex = dimensionList.value.findIndex(item => item.id === course_evaluate_top_id)
    dimensionList.value[dimensionIndex].chosen = false

    emits('onChange', contentList.value)
}

// 
const updateContent = debounce(() => {
    emits('onChange', contentList.value)
})

const init = () => {
    const fir = dimensionList.value.shift()
    chooseTag(fir as typeof dimensionList.value[0])
}

init()
</script>

<template>
    <div class="dimension-container">
        <section class="command-list">
            <div v-for="(item, index) in contentList" :key="index">
                <van-field
                    v-model="item.text"
                    rows="1"
                    :label="item.name"
                    autosize
                    type="textarea"
                    :placeholder="item.description"
                    label-align="top"
                    @blur="updateContent"
                >
                    <template #label>
                        <div class="dimention-tag">
                            {{ item.name }}
                            <van-icon name="clear" v-if="index" style="margin-left: 10px;" @click="delEditedDimension(item, index)" />
                        </div>
                    </template>
                </van-field>
            </div>
        </section>
        <section class="dimension-area">
            <span class="tip">评价维度</span>
            <div class="list-container">
                <div class="list">
                    <div class="tag" 
                        v-for="(item, index) in dimensionList"
                        :key="index"
                        :style="{
                            width: `${!item.chosen ? 'max-content' : '0px'}`,
                            marginRight: `${!item.chosen ? 10 : 0}px`,
                            padding: `${!item.chosen ? '0 12px' : '0 0'}`
                        }"
                    >
                        <div class="tag"
                            v-show="!item.chosen"
                            @click="chooseTag(item)"
                        >
                            {{ item.name }}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped lang="less">
.dimension-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    .command-list {
        .dimention-tag {
            font-size: 1.1em;
            font-weight: 600;
        }
    }
    .dimension-area {
        width: 100%;
        height: 1.6em;
        display: flex;
        line-height: 1.6em;
        .tip {
            width: fit-content;
            margin-right: 15px;
        }
        .list-container {
            flex: 1;
            height: 100%;
            overflow-x: auto;
            .list {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                .tag {
                    font-size: 0.85em;
                    background-color: rgb(242, 242, 242);
                    border-radius: 20px;
                    div {
                        width: max-content;
                    }
                }
            }
        }
    }
}

:deep(.van-cell) {
    padding: 10px 0;
}
:deep(.van-field__body) {
    height: auto;
    .van-field__control {
        font-size: 1.1em;
        font-weight: 400;
    }
}
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
</style>