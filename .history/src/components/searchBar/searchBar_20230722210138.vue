<script setup lang="ts">
import { ref } from 'vue'
defineProps<{
    setWidth?: {
        type: number,
        default: 600
    },
}>()


const keyWords = ref('')
</script>

<template>
    <div>
        <van-cell-group inset>
            <van-field v-model="keyWords" center clearable placeholder="请输入关键词搜索课程">
                <template #button>
                    <van-icon name="search" color="#3C3A36" @click="$emit('search', keyWords)" size="22" />
                </template>
            </van-field>
        </van-cell-group>
    </div>
</template>

<style lang="less" scoped>
:deep(.van-cell-group--inset) {
    border: 4px solid #bbb9b5;

    .van-field {
        padding: 25px;

        .van-field__control {
            width: 580px;
        }
    }
}
</style>