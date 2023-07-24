<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/store/modules/user';
import rq from '@/api/user/user'
import { defineAsyncComponent } from 'vue';
const searchBar = defineAsyncComponent(() => import('@/components/searchBar/searchBar.vue'))

onMounted(() => {

})


</script>

<template>
    <div class="container">
        <div class="header">
            {{ keyWords }}
            <search-Bar :keyWords="keyWords" />
        </div>
        <div class="searchBar">

        </div>
    </div>
</template>


<style scoped lang="less"></style>