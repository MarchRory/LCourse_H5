<script setup>
import { onMounted } from 'vue'
const auth = () => {
    let redirectPath = 'http://192.168.31.50:5173/login' // 开发阶段，配置重定向地址，这里是重定向到首页
    rq.yibanLogin(redirectPath)
}

onMounted(() => {
    anth()
})


</script>

<template>
    <div>

    </div>
</template>

<style></style>