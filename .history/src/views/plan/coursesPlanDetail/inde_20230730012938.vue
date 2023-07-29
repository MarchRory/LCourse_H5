<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted } from 'vue'
import rqObj from '@/api/objectives/objectives'
const route = useRoute()
const list = reactive([])
onMounted(() => {
    if (typeof route.query.id === 'number') {
        rqObj.getObjDetail(route.query.id)
            .then((res: any) => {
                const { courseList, courseObjectives } = res.data
            })
    }
})


</script>

<template>
    <div class="container">

    </div>
</template>

<style scoped lang="less"></style>