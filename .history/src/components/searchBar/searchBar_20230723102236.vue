<script setup lang="ts">
// 传入的 关键字
type inputProps = {
    keyWords: string
}
const inputProps = withDefaults(defineProps<inputProps>(), {
    keyWords: ''
})

// 组件对外发送事件
type inputEmits = {
    (event: "update:keyWords", value: string): void
}
const inputEmits = defineEmits<inputEmits>()

const changeInputValue = (e: string) => {
    inputEmits("update:keyWords", e)
}

</script>

<template>
    <div class="myInput">
        <van-cell-group inset>
            <van-field :model-value="inputProps.keyWords" @update:model-value="changeInputValue" type="text" center
                placeholder="请输入关键词搜索课程">
                <template #button>
                    <van-icon name="search" color="#3C3A36" size="22" />
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