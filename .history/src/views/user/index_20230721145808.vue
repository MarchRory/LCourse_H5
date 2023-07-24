<script setup>
import { useUserStore } from '@/store/modules/user';
const useStore = useUserStore()

const checked = ref(false)

const userInfo = [
    { icon: 'manager', key: '姓名', content: useStore.name },
    { icon: 'invitation', key: '联系方式', content: Object.values(useStore)[0] },
    { icon: 'lock', key: '密码', content: '修改密码' }
]

</script>

<template>
    <div class="container">
        <div class="avatar">
            <van-image round width="10rem" height="10rem" fit="cover" position="center"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        </div>
        <div class="infoBox" style="margin: 0 autp;">
            <div class="icon">
                <van-icon name="bell" color="#65AAEA" />
            </div>
            <div>
                通知
            </div>
            <div>
                <van-switch v-model="checked" size="22px" active-color="#5BA092" inactive-color="#dcdee0" />
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

:deep(.van-switch) {
    display: flex;
    align-items: center;
    font-size: 22px;
    height: 20px;
    background-color: rgb(91, 160, 146);
    width: 70px;

    .van-switch__node {
        top: -12px;
        left: 0;
        background: #589158;
        width: 30px;
        height: 30px;
        border: 6px solid #F8F2EE;
    }
}

.container {
    height: calc(100vh - var(--van-tabbar-height));

    .infoBox {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 343px;
        height: 100px;
        border-radius: 16px;
        padding: 8px 16px;
        gap: 8px;
        align-self: stretch;
        background: #FFFFFF;
        box-sizing: border-box;
        border: 1px solid #BEBAB3;
    }
}
</style>