<script setup>
import { onMounted } from 'vue/dist/vue.js';
import { useUserStore } from '@/store/modules/user';

onMounted(() => {

})

const initGetInfo = () => {
    const token = window.location.href.split('/?')[1].split('=')[1].split('#/')[0]
    const userStore = useUserStore()
    userStore.init(token)
        .then((res) => {

        })
}

</script>

<template>
    <div>

    </div>
</template>

<style scoped lang="less"></style>