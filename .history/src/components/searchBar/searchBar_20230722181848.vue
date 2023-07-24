<script setup>
import { defineProps } from 'vue';
</script>

<template>
    <div>
        <van-cell-group inset>
            <van-field v-model="sms" center clearable placeholder="请输入关键词搜索课程">
                <template #button>
                    <van-icon name="search" />
                </template>
            </van-field>
        </van-cell-group>
    </div>
</template>

<style lang="less" scoped></style>