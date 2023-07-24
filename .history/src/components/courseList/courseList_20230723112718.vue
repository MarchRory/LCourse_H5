<script setup  lang="ts">
import { reactive } from 'vue';
const selectParams = reactive({
    pageNum: 1,
    pageSize: 15
})
const loadStatus = reactive({
    loading: false,
    error: false,
    finished: true
})

type coursesProps = {
    coursesList: Array<any>
}
const coursesProps = withDefaults(defineProps<coursesProps>(), {
    coursesList: [] as any
})

// 组件对外发送事件
type Emits = {
}

</script>

<template>
    <div>
        <div class="list">
            <van-list v-model:loading="loadStatus.loading" :finished="loadStatus.finished" v-model:error="loadStatus.error"
                error-text="请求失败，点击重新加载" finished-text="已经到底了" @load="getList">
                <van-cell v-for="( item, index ) in  coursesList " :key="index">

                </van-cell>
            </van-list>
        </div>
    </div>
</template>

<style scoped lang="less"></style>