<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted } from 'vue'
import rqObj from '@/api/objectives/objectives'
const route = useRoute()
const courseList = reactive([])
onMounted(() => {
    rqObj.getObjDetail(route.query.id as number)
        .then((res: any) => {

        })
})


</script>

<template>
    <div>

    </div>
</template>

<style scoped lang="less"></style>