<script setup lang="ts">
const keyWords = ref('')
defineProps<{
}>()
</script>

<template>
    <div class="myInput">
        <van-cell-group inset>
            <van-field v-model="keyWords" center placeholder="请输入关键词搜索课程">
                <template #button>
                    <van-icon name="search" color="#3C3A36" @click="$emit('search', keyWords)" size="22" />
                </template>
            </van-field>
        </van-cell-group>
    </div>
</template>

<style lang="less" scoped>
.myInput {
    margin-bottom: 15px;

    :deep(.van-cell-group--inset) {
        border: 4px solid #bbb9b5;

        .van-field {
            padding: 25px;

            .van-field__control {
                width: 580px;
            }
        }
    }
}
</style>