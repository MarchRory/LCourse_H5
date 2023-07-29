<script setup lang="ts">
import { onMounted } from 'vue';
const isLoad = ref(false)
import { storeToRefs } from 'pinia'
import { usePlanStore } from '@/store/modules/plan/index'
const planStore = usePlanStore()
const { list, total } = storeToRefs(planStore)

onMounted(() => {
    if (!total.value) {
        planStore.getObjectives()
    }
})
</script>

<template>
    <div class="container">
        <van-sticky :offset-top="0">
            <header>
                <div class="temp" style="width: 12vw;"></div>
                <div class="title">
                    课<span style="color: #939392; font-weight: 200;">程</span>规<span
                        style="color: #939392; font-weight: 200;">划</span>
                </div>
                <div class="tools">
                    <van-icon name="apps-o" size="32" />
                </div>
            </header>
        </van-sticky>

        <van-loading color="#1989fa" v-if="isLoad" />
        <div class="list" v-if="!isLoad">
            <div class="object" v-for="(obj, index) in list" :key="index">
                <div class="seat">

                </div>
                <div class="ObjInfo">
                    <div>
                        {{ obj.objectivesName }}
                    </div>
                    <div>
                        <van-progress :pivot-text="`${(5 / obj.fixRestrictions) * 100}%`" color="#E3562A"
                            :percentage="(5 / obj.fixRestrictions) * 100" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
@objInfoWidth: 430px;

.container {
    width: 100%;
    height: calc();

    header {
        height: 140px;
        width: calc(100vw - 40px);
        display: flex;
        padding-left: 20px;
        padding-right: 20px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .title {
            font-family: Gen Jyuu Gothic;
            font-size: 42px;
            font-weight: 500;
            line-height: 32px;
            text-align: center;
            letter-spacing: 5px;
        }
    }

    .list {
        padding: 20px;
        overflow-y: auto;
        padding-bottom: 50px;

        .object {
            width: 690px;
            height: 200px;
            border-radius: 10px;
            margin-top: 18px;
            border: 1px solid #CDCDCD;
            overflow: hidden;
            display: flex;
            flex-direction: row;
            margin-top: 20px;

            .seat {
                height: 100%;
                width: calc(690px - @objInfoWidth);
                background-color: aqua;
            }

            .ObjInfo {
                width: @objInfoWidth;
                display: flex;
                flex-direction: column;

            }
        }
    }
}
</style>