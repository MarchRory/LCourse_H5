<script setup lang="ts">
defineProps<{
    width?: {
        type: number,
        default: 60
    }
}>()
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
    }
}
</style>