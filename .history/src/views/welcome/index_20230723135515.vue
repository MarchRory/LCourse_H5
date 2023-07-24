<script setup>
import { onMounted } from 'vue'
import rq from '@/api/user/user'
import router from '@/router/index'
import { getToken } from "@/utils/auth/auth"
const auth = () => {
    rq.yibanLogin()
}

onMounted(() => {
    rq.yibanLogin()
})
</script>

<template>
    <div>

    </div>
</template>

<style></style>