<script setup>
import { onMounted } from 'vue'
import rq from '@/api/user/user'
import router from '@/router/index'
import { getToken } from "@/utils/auth/auth"
const auth = () => {
    const token = window.location.href.split('/?')[1].split('=')[1].split('#/')[0]
    if (token) {
        console.log('token: ', token)
    }
    rq.yibanLogin()
}

onMounted(() => {
    auth()
})
</script>

<template>
    <div>

    </div>
</template>

<style></style>