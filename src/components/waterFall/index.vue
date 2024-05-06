<script setup lang="ts">
/**
 * @description 虚拟列表瀑布流组件, 本项目中默认给课程列表使用, 但也留有自定义插槽
 */
import { WaterFallListProps } from './types'
import useWaterFallFeed from './hooks/useWaterFall'
const DefaultCourseCard = defineAsyncComponent(() => import('./components/CardItem.vue'))
const props = withDefaults(defineProps<WaterFallListProps>(), {
    column: 2,
    gap: 10,
    pageSize: 20
})

const waterfall = ref<HTMLDivElement | null>(null)
const {
    isFinish,
    loading,
    curPage,
    listData,
    endIndex,
    renderedListStyle,
    renderedList,
    handleScroll
} = useWaterFallFeed(waterfall, props)
</script>

<template>
    <div
        ref="waterfall" 
        class="virtual-waterfallfeed-container"
        @scroll="handleScroll"
    >
        <div class="virtual-waterfallfeed-list">
            <div
                v-for="({item, style}, index) in renderedList"
                :style="style"
                :key="item.id"
                class="virtual-waterfallfeed-item"
            >
                <slot name="item" :item="item" :index="index">
                    <!--默认渲染课程列表-->
                    <!--@vue-ignore-->
                    <DefaultCourseCard :course="item" />
                </slot>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.virtual-waterfallfeed {
    &-container {
        height: 100%;
        width: 100%; 
        overflow-y: scroll;
        overflow-x: hidden;
    }
    &-list {
        position: relative;
        width: 100%;
    }
    &-item {
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        background-color: rgb(248, 248, 248);
        border-radius: 15px;
        overflow: hidden;
    }
}
</style>