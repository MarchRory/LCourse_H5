<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

</script>

<template>
    <div class="container">
        <van-sticky :offset-top="0">
            <header>
                <back-button></back-button>
            </header>
        </van-sticky>
    </div>
</template>

<style scoped lang="less">
.container {}
</style>