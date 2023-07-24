<script setup>
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