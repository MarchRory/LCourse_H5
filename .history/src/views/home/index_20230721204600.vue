<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/store/modules/user';
import rq from '@/api/user/user'

onMounted(() => {

})

const initGetInfo = () => {
    const token = window.location.href.split('/?')[1].split('=')[1].split('#/')[0]
    console.log('url: ', window.location.href)
    console.log(token)
    /*     const userStore = useUserStore()
        userStore.init(token)
            .then((res) => {
                rq.getInfo(token)
                    .then(res => {
                        console.log('info: ', res)
                    })
            }) */
}

</script>

<template>
    <div>

    </div>
</template>

<style scoped lang="less"></style>