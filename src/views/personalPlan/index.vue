<script setup lang="ts">

const XdHeader = defineAsyncComponent(() => import('@/components/header/index.vue'))
</script>

<template>
    <div class="plan-container">
        <XdHeader title="个人计划" />
        <main>

        </main>
    </div>
</template>

<style scoped lang="less">
.plan-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    main {
        flex: 1;
        width: 100%;
        overflow-y: auto;
    }
}
</style>