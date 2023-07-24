<script setup>
import { defineProps } from 'vue';
</script>

<template>
    <div>
        <van-cell-group inset>
            <van-field v-model="keyWords" center clearable placeholder="请输入关键词搜索课程">
                <template #button>
                    <van-icon name="search" color="#3C3A36" size="23" />
                </template>
            </van-field>
        </van-cell-group>
    </div>
</template>

<style lang="less" scoped>
:deep(.van-cell-group--inset) {
    border: 1px solid #BEBAB3;

    .van-field {
        padding: 20px;
    }
}
</style>