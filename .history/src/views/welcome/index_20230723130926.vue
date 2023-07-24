<script setup>
import { onMounted } from 'vue'
import rq from '@/api/user/user'
import router from '@/router/index'
import { getToken } from "@/utils/auth/auth"
import { RouterLink } from 'vue-router';
const auth = () => {
    /*     if (getToken()) {
            router.push({ path: '/login' })
        } else {
            rq.yibanLogin()
        } */
}

onMounted(() => {
    //auth()
})
</script>

<template>
    <div>

    </div>
</template>

<style></style>