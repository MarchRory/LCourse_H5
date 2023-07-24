<script setup>
import { onMounted } from 'vue'
import rq from '@/api/user/user'
import router from '@/router/index'
import { getToken } from "@/utils/auth/auth"
const auth = () => {
    let redirectPath = 'http://192.168.31.50:5173/#/login' // 开发阶段，配置重定向地址，这里是重定向到登录页
    rq.yibanLogin(redirectPath)
}

onMounted(() => {
    auth()
})

const push = () => {
    router.push({ path: '/login' })
}
</script>

<template>
    <div>
        <button @click="push">push</button>
    </div>
</template>

<style></style>