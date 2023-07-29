<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, defineAsyncComponent } from 'vue'
import rqObj from '@/api/objectives/objectives'
const courseslist = defineAsyncComponent(
    () => import('@/components/courseList/courseList.vue')
)
const route = useRoute()
const list = ref([])
onMounted(() => {
    if (typeof route.query.id === 'number') {
        rqObj.getObjDetail(route.query.id)
            .then((res: any) => {
                const { courseList, courseObjectives } = res.data
                list.value = courseList
            })
    }
})


</script>

<template>
    <div class="container">

    </div>
</template>

<style scoped lang="less"></style>