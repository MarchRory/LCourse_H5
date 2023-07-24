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
                    <van-icon name="search" color="#3C3A36" size="20" />
                </template>
            </van-field>
        </van-cell-group>
    </div>
</template>

<style lang="less" scoped>
:deep(.van-cell-group--inset) {
    border: 3px solid #BEBAB3;

    .van-field {
        padding: 20px;

        .van-field__control {
            width: 600px;
        }
    }
}
</style>