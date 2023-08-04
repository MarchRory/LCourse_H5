<script setup>
import { useUserStore } from '@/store/modules/user';
import { onMounted } from 'vue'
import rq from '@/api/user/user'
import router from '@/router/index'
import { getToken } from '@/utils/auth/auth';
const userStore = useUserStore()

const init = () => {
    let oldtoken = getToken()
    if (oldtoken) {
        getUserInfo(oldtoken)
    } else {
        const token = window.location.href.split('/?')[1].split('=')[1].split('#/')[0]
        getUserInfo(token)
    }
}

const getUserInfo = (token) => {
    userStore.init(token)
        .then(() => {
            rq.getInfo(token)
                .then((res) => {
                    const info = Object.assign(res[0].data.userInfo, res[1].data)
                    userStore.initInfo(info)
                        .then(res => {
                            setTimeout(() => {
                                router.replace({ path: '/home' })
                            }, 800)
                        })
                })
        })
}
onMounted(() => {
    // auth()
    loadLogo()
    init()
})
</script>

<template>
    <div>
    </div>
</template>
