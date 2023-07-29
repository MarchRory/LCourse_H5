<script setup>
import { useRoute } from 'vue-router';
import { onMounted } from 'vue'
import rqObj from '@/api/objectives/objectives'
const route = useRoute()
onMounted(() => {
    rqObj.getObjDetail(route.query.id)
        .then(() => {

        })
})


</script>

<template>
    <div>

    </div>
</template>

<style scoped lang="less"></style>