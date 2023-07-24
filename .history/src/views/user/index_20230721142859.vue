<script setup>
import { useUserStore } from '@/store/modules/user';
const useStore = useUserStore()

const userInfo = [
    { icon: 'bell', key: '姓名', content: useStore.name },
    { icon: 'manager', key: '联系方式', content: Object.values(useStore)[0] },
    { icon: 'invitation' },
    { icon: 'lock' }
]

</script>

<template>
    <div class="container">
        <div class="avatar">
            <van-image round width="10rem" height="10rem" fit="cover" position="center"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        </div>
        <div class="infoBox">
            <div class="icon">

            </div>
            <div>
                通知
            </div>
        </div>
        <div> 用户信息 </div>
        <div id="userInfo">
            <div class="infoBox" v-for="(item, index) in userInfo" :key="index">
                <div class="icon">

                </div>
                <div class="info">
                    <div class="tag"></div>
                    <div class="detailInfo"></div>
                </div>
                <div class="tools">

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
:deep(.van-image--round .van-image__img) {
    border: 10px solid #c0e2ff;
}

.container {
    height: calc(100vh - var(--van-tabbar-height));
}
</style>